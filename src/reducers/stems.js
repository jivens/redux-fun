import { RECEIVE_STEMS, DELETE_STEM } from '../actions/stems'

export default function stems (state = {}, action) {
  switch (action.type) {
    case RECEIVE_STEMS :
      return {
        ...state,
        ...action.stems,
      }
    case DELETE_STEM :
      let newData = state.data.filter(function (stem) {
        if (stem.id !== action.stem.id) {
          return stem
        }
      })
      newData.push(action.stem)
      return {
        ...state,
        data: newData
      }
    default :
      return state
  }
}
