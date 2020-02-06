import { getUserToken, getUserFromToken, getAffixesQuery, getRootsQuery, getStemsQuery, deleteAffixMutation, deleteRootMutation, deleteStemMutation, addAffixMutation , updateAffixMutation, addRootMutation, updateRootMutation, addStemMutation, updateStemMutation, addUserMutation, getTextsQuery, getAudioSetsQuery } from '../queries/queries'

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
    client.query({
      query: getTextsQuery,
      variables: {}
    }),
    client.query({
      query: getAudioSetsQuery,
      variables: {}
    })
  ]).then(([stems, roots, affixes, texts, audios]) => ({
    stems: {
      data: stems.data.stems_Q,
      tableData: {
        page: 0,
        pageSize: 10,
        sorted: [{
          id: 'category',
          desc: false
        }],
        filtered: [],
        resized: [],
      }
    },
    roots: {
      data: roots.data.roots_Q,
      tableData: {
        page: 0,
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
    texts: {
      data: texts.data.texts_Q,
      tableData: {
        page: 0,
        pageSize: 10,
        sorted: [{
          id: 'rnumber',
          desc: false
        }],
        filtered: [],
        resized: [],
      }
    },
    audios: {
      data: audios.data.audiosets_Q,
      tableData: {
        page: 0,
        pageSize: 10,
        sorted: [],
        filtered: [],
        resized: [],
      }
    }
  }))
}

export function deleteAffix(client, id){
  return client.mutate({
    mutation: deleteAffixMutation,
    variables: { id: id }
  })
}

export function deleteRoot(client, id){
  return client.mutate({
    mutation: deleteRootMutation,
    variables: { id: id }
  })
}

export function deleteStem(client, id){
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

export function getUserInfo(client){
  return client.query({
    query: getUserFromToken,
    variables: {}
  })
}

export function saveUser(client, user){
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

