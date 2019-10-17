import { RECEIVE_STEMS, DELETE_STEM } from '../actions/stems'

export default function stems (state = {}, action) {
  switch (action.type) {
    case RECEIVE_STEMS :
      return {
        ...state,
        ...action.stems,
      }
    case DELETE_STEM :
      let newHash = state
      newHash[action.stem.id-1] = action.stem
      return {
        ...newHash
      }
    default :
      return state
  }
}
