import { RECEIVE_STEMS } from '../actions/stems'

export default function stems (state = {}, action) {
  switch (action.type) {
    case RECEIVE_STEMS :
      return {
        ...state,
        ...action.stems,
      }
    default :
      return state
  }
}
