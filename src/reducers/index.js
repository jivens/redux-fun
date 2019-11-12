import { combineReducers } from 'redux'
import users from './users'
import affixes from './affixes'
import stems from './stems'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  users,
  stems,
  affixes,
  loadingBar: loadingBarReducer
})