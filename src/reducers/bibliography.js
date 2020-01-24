import { RECEIVE_BIBLIOGRAPHIES, DELETE_BIBLIOGRAPHY, ADD_BIBLIOGRAPHY, EDIT_BIBLIOGRAPHY,
  SET_BIBLIOGRAPHY_PAGE_SIZE, SET_BIBLIOGRAPHY_PAGE,
  SET_BIBLIOGRAPHY_FILTERED, SET_BIBLIOGRAPHY_SORTED, SET_BIBLIOGRAPHY_RESIZED } from '../actions/bibliography'
import {toast} from "react-toastify"

export default function bibliographies (state = {}, action) {
  switch (action.type) {
    case RECEIVE_BIBLIOGRAPHIES :
      return {
        ...state,
        ...action.bibliographies,
      }
    case ADD_BIBLIOGRAPHY :
      let bibliographyData = Object.assign({}, state.data)
      bibliographyData.push(action.bibliography)
      return {
        ...state,
        data: bibliographyData
      }
    case EDIT_BIBLIOGRAPHY :
      let editData = state.data.filter(function (bibliography) {
        if (bibliography.id !== action.bibliography.originalBibliography.id) {
          return bibliography
        }
      })
      let originalBibliography = action.bibliography.originalBibliography
      originalBibliography.active = 'N'
      editData.push(action.bibliography.newBibliography)
      editData.push(originalBibliography)
      return {
        ...state,
        data: editData
      }
    case DELETE_BIBLIOGRAPHY :
      let newData = state.data.filter(function (bibliography) {
        if (bibliography.id !== action.bibliography.id) {
          return bibliography
        }
      })
      newData.push(action.bibliography)
      toast.success(`Deleted bibliography ID: ${action.bibliography.id}: ${action.bibliography.nicodemus}, ${action.bibliography.english}`)
      return {
        ...state,
        data: newData
      }
    case SET_BIBLIOGRAPHY_PAGE_SIZE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          pageSize: action.pageSize,
          page: action.page
        }
      }
    case SET_BIBLIOGRAPHY_PAGE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          page: action.page
        }
      }
    case SET_BIBLIOGRAPHY_SORTED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          sorted: action.newSorted
        }
      }
    case SET_BIBLIOGRAPHY_FILTERED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          filtered: action.filtered
        }
      }
    case SET_BIBLIOGRAPHY_RESIZED :
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