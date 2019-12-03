import { RECEIVE_ERRORS } from '../actions/errors'

export default function errors (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ERRORS :
      return {
        ...state,
        ...action.errors,
      }
    default :
      return state
  }
}