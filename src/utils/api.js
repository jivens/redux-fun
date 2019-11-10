import {
  _getUsers,
  _getPolls,
  _savePoll,
  _savePollAnswer
} from './_DATA.js'
import { getUsersQuery, getUserToken, getAffixesQuery, getStemsQuery, deleteAffixMutation, deleteStemMutation, addAffixMutation , updateAffixMutation, addStemMutation, updateStemMutation, addUserMutation} from '../queries/queries'
import { isObject, hashToArray } from './helpers'

function flattenPoll (poll) {
  return Object.keys(poll)
    .reduce((flattenedPoll, key) => {
      const val = poll[key]

      if (isObject(val)) {
        flattenedPoll[key + 'Text'] = val.text
        flattenedPoll[key + 'Votes'] = val.votes
        return flattenedPoll
      }

      flattenedPoll[key] = val
      return flattenedPoll
    }, {})
}

function formatPolls (polls) {
  const pollIds = Object.keys(polls)

  return pollIds.reduce((formattedPolls, id) => {
    formattedPolls[id] = flattenPoll(polls[id])
    return formattedPolls
  }, {})
}

function formatUsers (users) {
  return Object.keys(users)
    .reduce((formattedUsers, id) => {
      const user = users[id]

      formattedUsers[id] = {
        ...user,
        answers: Object.keys(user.answers)
      }

      return formattedUsers
    }, {})
}

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getPolls(),
  ]).then(([users, polls]) => ({
    users: formatUsers(users),
    polls: formatPolls(polls),
  }))
}

export function getInitialAppData (client) {
  return Promise.all([
    client.query({
      query: getStemsQuery,
      variables: {}
    }),
    client.query({
      query: getAffixesQuery,
      variables: {}
    }),
    // client.query({
    //   query: getUsersQuery,
    //   variables: {}
    // }),
  ]).then(([stems, affixes]) => ({
    stems: {
      data: stems.data.stems_Q,
      tableData: {
        page: 2,
        pageSize: 10
      }
    },
    affixes: {
      data: affixes.data.affixes_Q,
      tableData: {
        page: 2,
        pageSize: 10,
        sorted: [{
          id: 'type',
          desc: false
        },{
          id: 'nicodemus',
          desc: false
        }],
        filtered: [],
        resized: [],
      }
    },
    // users: {
    //   data: users.data.users_Q
    // }
  }))
}

export function deleteAffix(client, id){
  let variables = {}
  return client.mutate({
    mutation: deleteAffixMutation,
    variables: { id: id }
  })
}

export function deleteStem(client, id){
  let variables = {}
  return client.mutate({
    mutation: deleteStemMutation,
    variables: { id: id }
  })
}

export function loginUser(client, user){
  return client.query({
    query: getUserToken,
    variables: {
      email: user.email,
      password: user.password
    }
  })
}

export function saveUser(client, user){
  let variables = {}
  return client.mutate({
    mutation: addUserMutation,
    variables: {
      first: user.first,
      last: user.last,
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles,
    }
  })
}

export function saveAffix(client, affix){
  let variables = {}
  return client.mutate({
    mutation: addAffixMutation,
    variables: {
      type: affix.type,
      salish: affix.salish,
      nicodemus: affix.nicodemus,
      english: affix.english,
      link: affix.link,
      page: affix.page,
      editnote: affix.editnote,
    }
  })
}

export function saveStem(client, stem){
  let variables = {}
  return client.mutate({
    mutation: addStemMutation,
    variables: {
      category: stem.category,
      reichard: stem.reichard,
      doak: stem.doak,
      salish: stem.salish,
      nicodemus: stem.nicodemus,
      english: stem.english,
      note: stem.note,
      editnote: stem.editnote,
    }
  })
}


export function editAffix(client, affix){

  return client.mutate({
    mutation: updateAffixMutation,
    variables: {
      id: affix.id,
      type: affix.type,
      salish: affix.salish,
      nicodemus: affix.nicodemus,
      english: affix.english,
      link: affix.link,
      page: affix.page,
      editnote: affix.editnote,
    }
  })
}

export function editStem(client, stem){

  return client.mutate({
    mutation: updateStemMutation,
    variables: {
      id: stem.id,
      category: stem.category,
      reichard: stem.reichard,
      doak: stem.doak,
      salish: stem.salish,
      nicodemus: stem.nicodemus,
      english: stem.english,
      note: stem.note,
      editnote: stem.editnote,
    }
  })
}

export function savePoll (poll) {
  return _savePoll(poll)
    .then((p) => flattenPoll(p))
}

export function savePollAnswer (args) {
  return _savePollAnswer(args)
}
