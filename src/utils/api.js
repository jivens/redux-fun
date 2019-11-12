import { getUsersQuery, getUserToken, getAffixesQuery, getStemsQuery, deleteAffixMutation, deleteStemMutation, addAffixMutation , updateAffixMutation, addStemMutation, updateStemMutation, addUserMutation} from '../queries/queries'
import { isObject, hashToArray } from './helpers'

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

