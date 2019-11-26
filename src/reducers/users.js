import { LOGIN_USER, ADD_USER, RECEIVE_USERS, LOGOUT_USER } from '../actions/users'

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
    case LOGOUT_USER :
      localStorage.removeItem('TOKEN')
      return state
    case ADD_USER :
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