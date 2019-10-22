import { RECEIVE_AFFIXES, DELETE_AFFIX, ADD_AFFIX } from '../actions/affixes'

export default function affixes (state = {}, action) {
  switch (action.type) {
    case RECEIVE_AFFIXES :
      return {
        ...state,
        ...action.affixes,
      }
    case ADD_AFFIX :
      let affixData = state.data
      affixData.push(action.affix)
      return {
        ...state,
        data: affixData
      }
    case DELETE_AFFIX :
      let newData = state.data.filter(function (affix) {
        if (affix.id !== action.affix.id) {
          return affix
        }
      })
      newData.push(action.affix)
      return {
        ...state,
        data: newData
      }
    default :
      return state
  }
}
