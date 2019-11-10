import { loginUser, addUser } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

//export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'
export const LOGIN_USER = 'LOGIN_USER'

function saveUser (user) {
  return {
    type: ADD_USER,
    user,
  }
}

function loggedIn (user) {
  return {
    type: LOGIN_USER,
    user,
  }
}

// export function receiveUsers (users) {
//   return {
//     type: RECEIVE_USERS,
//     users,
//   }
// }

export function handleLoginUser (client, user) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return loginUser(client, user)
    .then((userData) => dispatch(loggedIn(userData.data.loginUser_Q)))
    .then(() => dispatch(hideLoading()))
  }
}
