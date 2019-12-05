import { combineReducers } from 'redux'
import users from './users'
import affixes from './affixes'
import roots from './roots'
import stems from './stems'
import errors from './errors'
//import navbar from './navbar'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  stems,
  roots,
  affixes,
  //navbar,
  users,
  errors,
  loadingBar: loadingBarReducer
})