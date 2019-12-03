import { receiveErrors } from '../actions/errors'

export function isLoggedIn () {
  localStorage.getItem('TOKEN') ? true : false
}

export function isObject (item) {
  return Object.prototype.toString.call(item) === '[object Object]'
}

export function getPercentage (count, total) {
  return total === 0 ? 0 : parseInt(count / total * 100, 10)
}

export function errorCallback (dispatch, getState, error) {
  return (dispatch, getState) => {
    console.error("ERROR =>", error.graphQLErrors.map(x => x.message))
    const errors = {
      errorsText: error.graphQLErrors.map(x => x.message)
    }
    dispatch(receiveErrors(errors))
  }
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
