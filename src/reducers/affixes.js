import { RECEIVE_AFFIXES, DELETE_AFFIX, ADD_AFFIX, EDIT_AFFIX,
  SET_AFFIX_PAGE_SIZE, SET_AFFIX_PAGE,
  SET_AFFIX_FILTERED, SET_AFFIX_SORTED, SET_AFFIX_RESIZED } from '../actions/affixes'
import {toast} from "react-toastify"

export default function affixes (state = {}, action) {
  switch (action.type) {
    case RECEIVE_AFFIXES :
      return {
        ...state,
        ...action.affixes,
      }
    case ADD_AFFIX :
      let affixData = Object.assign({}, state.data)
      affixData.push(action.affix)
      return {
        ...state,
        data: affixData
      }
    case EDIT_AFFIX :
      let editData = state.data.filter(function (affix) {
        if (affix.id !== action.affix.originalAffix.id) {
          return affix
        }
      })
      let originalAffix = action.affix.originalAffix
      originalAffix.active = 'N'
      editData.push(action.affix.newAffix)
      editData.push(originalAffix)
      return {
        ...state,
        data: editData
      }
    case DELETE_AFFIX :
      let newData = state.data.filter(function (affix) {
        if (affix.id !== action.affix.id) {
          return affix
        }
      })
      newData.push(action.affix)
      toast.success(`Deleted affix ID: ${action.affix.id}: ${action.affix.nicodemus}, ${action.affix.english}`)
      return {
        ...state,
        data: newData
      }
    case SET_AFFIX_PAGE_SIZE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          pageSize: action.pageSize,
          page: action.page
        }
      }
    case SET_AFFIX_PAGE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          page: action.page
        }
      }
    case SET_AFFIX_SORTED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          sorted: action.newSorted
        }
      }
    case SET_AFFIX_FILTERED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          filtered: action.filtered
        }
      }
    case SET_AFFIX_RESIZED :
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