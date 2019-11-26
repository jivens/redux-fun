import { getUsersQuery, getUserToken, getAffixesQuery, getRootsQuery, getStemsQuery, deleteAffixMutation, deleteRootMutation, deleteStemMutation, addAffixMutation , updateAffixMutation, addRootMutation, updateRootMutation, addStemMutation, updateStemMutation, addUserMutation} from '../queries/queries'
import { isObject, hashToArray } from './helpers'

export function getInitialAppData (client) {
  return Promise.all([
    client.query({
      query: getStemsQuery,
      variables: {}
    }),
    client.query({
      query: getRootsQuery,
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
  ]).then(([stems, roots, affixes]) => ({
    stems: {
      data: stems.data.stems_Q,
      tableData: {
        page: 0,
        pageSize: 10,
        sorted: [{
          id: 'category',
          desc: false
        },{
          id: 'nicodemus',
          desc: false
        }],
        filtered: [],
        resized: [],
      }
    },
    roots: {
      data: roots.data.roots_Q,
      tableData: {
        page: 2,
        pageSize: 10,
        sorted: [{
          id: 'root',
          desc: false
        },{
          id: 'sense',
          desc: false
        }],
        filtered: [],
        resized: []
      },
    },
    affixes: {
      data: affixes.data.affixes_Q,
      tableData: {
        page: 0,
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
    // navbar: {
    //   rightItems: [
    //     { to: "/search", icon: 'search', content:"Search", key: 'rsearch'},
    //     { to: "/register", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'}
    //   ]
    // }
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

export function deleteRoot(client, id){
  let variables = {}
  return client.mutate({
    mutation: deleteRootMutation,
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

export function saveRoot(client, root){
  let variables = {}
  return client.mutate({
    mutation: addRootMutation,
    variables: {
      root: root.root,
      number: root.number,
      sense: root.sense,
      salish: root.salish,
      nicodemus: root.nicodemus,
      symbol: root.symbol,
      english: root.english,
      grammar: root.grammar,
      crossref: root.crossref,
      variant: root.variant,
      cognate: root.cognate,
      editnote: root.editnote,
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

export function editRoot(client, root){
  return client.mutate({
    mutation: updateRootMutation,
    variables: {
      id: root.id,
      root: root.root,
      number: root.number,
      sense: root.sense,
      salish: root.salish,
      nicodemus: root.nicodemus,
      symbol: root.symbol,
      english: root.english,
      grammar: root.grammar,
      crossref: root.crossref,
      variant: root.variant,
      cognate: root.cognate,
      editnote: root.editnote,
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
