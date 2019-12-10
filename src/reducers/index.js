import { combineReducers } from 'redux'
import users from './users'
import affixes from './affixes'
import roots from './roots'
import stems from './stems'
import errors from './errors'
import texts from './texts'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  stems,
  roots,
  affixes,
  texts,
  users,
  errors,
  loadingBar: loadingBarReducer
})