import { LOGIN_USER, ADD_USER, RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER :
      const token = action.user[0].password
      localStorage.removeItem('TOKEN')
      localStorage.setItem('TOKEN', token)
      return state
    // case RECEIVE_USERS :
    //   return {
    //     ...state,
    //     ...action.users,
    //   }
    default :
      return state
  }
}