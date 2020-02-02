import { RECEIVE_AUDIOS,
  SET_AUDIO_PAGE_SIZE, SET_AUDIO_PAGE,
  SET_AUDIO_FILTERED, SET_AUDIO_SORTED, SET_AUDIO_RESIZED } from '../actions/audios'
import {toast} from "react-toastify"

export default function audios (state = {}, action) {
  switch (action.type) {
    case RECEIVE_AUDIOS :
      return {
        ...state,
        ...action.audios,
      }
    case SET_AUDIO_PAGE_SIZE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          pageSize: action.pageSize,
          page: action.page
        }
      }
    case SET_AUDIO_PAGE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          page: action.page
        }
      }
    case SET_AUDIO_SORTED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          sorted: action.newSorted
        }
      }
    case SET_AUDIO_FILTERED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          filtered: action.filtered
        }
      }
    case SET_AUDIO_RESIZED :
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