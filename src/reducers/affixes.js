import { RECEIVE_AFFIXES, DELETE_AFFIX } from '../actions/affixes'

export default function affixes (state = {}, action) {
  switch (action.type) {
    case RECEIVE_AFFIXES :
      return {
        ...state,
        ...action.affixes,
      }
    case DELETE_AFFIX :
      let newHash = state
      // Object.keys(state).forEach(function (key) {
      //   if (key != action.affix.id-1) {
      //     newHash[key] = state[key]
      //   }
      // })
      newHash[action.affix.id-1] = action.affix
      return {
        ...newHash
      }
    default :
      return state
  }
}
