import { combineReducers } from 'redux'
import users from './users'
import affixes from './affixes'
import roots from './roots'
import stems from './stems'
import errors from './errors'
import texts from './texts'
import audios from './audios'
import spellings from './spellings'
import consonants from './consonants'
import vowels from './vowels'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  stems,
  roots,
  affixes,
  texts,
  audios,
  users,
  spellings,
  consonants,
  vowels,
  errors,
  loadingBar: loadingBarReducer
})