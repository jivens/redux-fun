import { LOGIN_USER, ADD_USER, LOGOUT_USER, USER_INFO } from '../actions/users'
import {toast} from "react-toastify"

export default function users (state = {}, action) {

  switch (action.type) {
    case LOGIN_USER :
      if (action.user) {
        const token = action.user[0].password
        localStorage.removeItem('TOKEN')
        localStorage.setItem('TOKEN', token)

      } else {
        console.log('bad login')
      }
      return state
    case USER_INFO :
      //set up user info that navbar can read
      console.log('action.user is: ', action.user)
      toast.success(`Successfully logged in as: ${action.user.username}`)
      return {
        ...state,
        currentUser: action.user
      }
    case LOGOUT_USER :
      localStorage.removeItem('TOKEN')
      return {}
    case ADD_USER :
      // if (action.user) {
      //
      // }
      //let userData = state.data -- we'll need to add this when we handle admin users
      //userData.push(action.user)
      return state
      // return {
      //   ...state,
      //   data: userData
      // }
    // case RECEIVE_USERS :
    //   return {
    //     ...state,
    //     ...action.users,
    //   }
    default :
      return state
  }
}
