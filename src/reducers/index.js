import { combineReducers } from 'redux'
import users from './users'
import affixes from './affixes'
import stems from './stems'
//import navbar from './navbar'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  stems,
  affixes,
  //navbar,
  users,
  loadingBar: loadingBarReducer
})