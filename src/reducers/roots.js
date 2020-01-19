import { RECEIVE_ROOTS, DELETE_ROOT, ADD_ROOT, EDIT_ROOT,
  SET_ROOT_PAGE_SIZE, SET_ROOT_PAGE,
  SET_ROOT_FILTERED, SET_ROOT_SORTED, SET_ROOT_RESIZED } from '../actions/roots'
import {toast} from "react-toastify"

export default function roots (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ROOTS :
      return {
        ...state,
        ...action.roots,
      }
    case ADD_ROOT :
      let rootData = Object.assign({}, state.data)
      rootData.push(action.root)
      return {
        ...state,
        data: rootData
      }
    case EDIT_ROOT :
      let editData = state.data.filter(function (root) {
        if (root.id !== action.root.originalRoot.id) {
          return root
        }
      })
      let originalRoot = action.root.originalRoot
      originalRoot.active = 'N'
      editData.push(action.root.newRoot)
      editData.push(originalRoot)
      return {
        ...state,
        data: editData
      }
    case DELETE_ROOT :
      let newData = state.data.filter(function (root) {
        if (root.id !== action.root.id) {
          return root
        }
      })
      newData.push(action.root)
      toast.success(`Deleted root ID ${action.root.id}: ${action.root.nicodemus}, ${action.root.english}`)
      return {
        ...state,
        data: newData
      }
    case SET_ROOT_PAGE_SIZE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          pageSize: action.pageSize,
          page: action.page
        }
      }
    case SET_ROOT_PAGE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          page: action.page
        }
      }
    case SET_ROOT_SORTED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          sorted: action.newSorted
        }
      }
    case SET_ROOT_FILTERED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          filtered: action.filtered
        }
      }
    case SET_ROOT_RESIZED :
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
