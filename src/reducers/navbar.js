import { LOGIN_USER, LOGOUT_USER } from '../actions/users'
import { RECEIVE_NAVBAR } from '../actions/navbar'

export default function navbar (state = {}, action) {
  switch (action.type) {
    case RECEIVE_NAVBAR :
      return {
        ...state,
        ...action.navbar,
      }
    case LOGIN_USER :
      let loginRightItems = state.rightItems
      let loginUserIcon = loginRightItems.pop()
      loginRightItems.push({ to: "/users", icon: 'user', content:"User Profile", key: 'ruser'})
      return {
        ...state,
        rightItems: loginRightItems
      }
    case LOGOUT_USER :
      let logoutRightItems = state.rightItems
      let logoutUserIcon = logoutRightItems.pop()
      logoutRightItems.push({ to: "/register", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'})
      return {
        ...state,
        rightItems: logoutRightItems
      }
    default :
      return state
  }
}