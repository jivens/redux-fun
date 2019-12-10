import { RECEIVE_TEXTS, SET_TEXT_PAGE_SIZE, SET_TEXT_PAGE,
  SET_TEXT_FILTERED, SET_TEXT_SORTED, SET_TEXT_RESIZED} from '../actions/texts'

export default function texts (state = {}, action) {
  switch (action.type) {
    case RECEIVE_TEXTS :
      return {
        ...state,
        ...action.texts,
      }
    case SET_TEXT_PAGE_SIZE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          pageSize: action.pageSize,
          page: action.page
        }
      }
    case SET_TEXT_PAGE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          page: action.page
        }
      }
    case SET_TEXT_SORTED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          sorted: action.newSorted
        }
      }
    case SET_TEXT_FILTERED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          filtered: action.filtered
        }
      }
    case SET_TEXT_RESIZED :
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
