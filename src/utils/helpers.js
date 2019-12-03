export function isLoggedIn () {
  localStorage.getItem('TOKEN') ? true : false
}

export function isObject (item) {
  return Object.prototype.toString.call(item) === '[object Object]'
}

export function getPercentage (count, total) {
  return total === 0 ? 0 : parseInt(count / total * 100, 10)
}

export function errorCallback (error) {
  console.error("ERROR =>", error.graphQLErrors.map(x => x.message))
  // Write a thing to dispatch an error action to add errors to the store
}

export function hashToArray(hash) {
  const arr = []
  Object.keys(hash).forEach(function (key) {
    const newHash = {}
    Object.keys(hash[key]).forEach(function (element) {
      newHash[element] = hash[key][element]
    })
    arr.push(
      newHash
    )
  })
  return arr
}

// function keysToList(list) {
//   const liElements = []
//   Object.keys(list).forEach(function (key) {
//     const {id, salish, nicodemus, english, active} = list[key]
//     liElements.push(
//       <li>
//         <span>{[id, salish, nicodemus, english, active].join(' | ')}</span>
//         <button onClick={() => alert('Remove')}>X</button>
//       </li>
//     )
//   })
//   return <ul>{liElements}</ul>
// }
