import { RECEIVE_STEMS, DELETE_STEM, ADD_STEM, EDIT_STEM,
  SET_STEM_PAGE_SIZE, SET_STEM_PAGE,
  SET_STEM_FILTERED, SET_STEM_SORTED, SET_STEM_RESIZED} from '../actions/stems'

export default function stems (state = {}, action) {
  switch (action.type) {
    case RECEIVE_STEMS :
      return {
        ...state,
        ...action.stems,
      }
    case ADD_STEM :
      let stemData = state.data
      stemData.push(action.stem)
      return {
        ...state,
        data: stemData
      }
    case EDIT_STEM :
      let editData = state.data.filter(function (stem) {
        if (stem.id !== action.stem.originalStem.id) {
          return stem
        }
      })
      let originalStem = action.stem.originalStem
      originalStem.active = 'N'
      editData.push(action.stem.newStem)
      editData.push(originalStem)
      return {
        ...state,
        data: editData
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
    case SET_STEM_PAGE_SIZE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          pageSize: action.pageSize,
          page: action.page
        }
      }
    case SET_STEM_PAGE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          page: action.page
        }
      }
    case SET_STEM_SORTED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          sorted: action.newSorted
        }
      }
    case SET_STEM_FILTERED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          filtered: action.filtered
        }
      }
    case SET_STEM_RESIZED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          resized: action.resized
        }
      }
    default :
      return state
  }
}
