import { loginUser, saveUser, getUserInfo } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveErrors } from '../actions/errors'

//export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const USER_INFO = 'USER_INFO'
export const CURRENT_USER = 'CURRENT_USER'

function addUser (user) {
  return {
    type: ADD_USER,
    user,
  }
}
//sets the token
function loggedIn (user) {
  return {
    type: LOGIN_USER,
    user,
  }
}

//deletes the token
function loggedOut (user) {
  return {
    type: LOGOUT_USER
  }
}

//sets userData
function setUserInfo (user) {
  return {
    type: USER_INFO,
    user
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
    .then(() => dispatch(handleUserInfo(client)))
    .then(() => dispatch(hideLoading()))
    .catch((error) => {
      const errors = {
        errorsText: error.graphQLErrors.map(x => x.message)
      }
      dispatch(receiveErrors(errors))
      dispatch(hideLoading())
    })
  }
}

export function handleLogoutUser (client, user) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    dispatch(loggedOut(user))
    dispatch(hideLoading())
  }
}

export function handleSaveUser (client, user) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return saveUser(client, user)
    .then((userData) => dispatch(addUser(userData.data.addUser_M)))
    .then(() => dispatch(hideLoading()))
    .catch((error) => {
      console.error("ERROR =>", error.graphQLErrors.map(x => x.message))
      const errors = {
        errorsText: error.graphQLErrors.map(x => x.message)
      }
      dispatch(receiveErrors(errors))
      dispatch(hideLoading())
    })
  }
}

export function handleUserInfo (client) {
  return (dispatch, getState) => {
    return getUserInfo(client)
    .then((userData) => dispatch(setUserInfo(userData.data.getUserFromToken_Q)))
  }
}