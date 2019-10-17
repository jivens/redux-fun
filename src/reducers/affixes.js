<<<<<<< HEAD
import { RECEIVE_AFFIXES } from '../actions/affixes'

export default function affixes (state = {}, action) {
  switch (action.type) {
    case RECEIVE_AFFIXES :
      return {
        ...state,
        ...action.affixes,
      }
    default :
      return state
  }
}
=======
import { RECEIVE_AFFIXES, DELETE_AFFIX } from '../actions/affixes'

export default function affixes (state = {}, action) {
  switch (action.type) {
    case RECEIVE_AFFIXES :
      return {
        ...state,
        ...action.affixes,
      }
    case DELETE_AFFIX :
      return {
        ...state.filter(function(affix) {
            return affix.id !== action.affix.id
        }),
        [action.affix.id]: action.affix,
      }
    default :
      return state
  }
}
>>>>>>> master
