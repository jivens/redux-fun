import { deleteBibliography, saveBibliography, editBibliography } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveErrors } from '../actions/errors'

export const RECEIVE_BIBLIOGRAPHIES = 'RECEIVE_BIBLIOGRAPHIES'
export const DELETE_BIBLIOGRAPHY = 'DELETE_BIBLIOGRAPHY'
export const ADD_BIBLIOGRAPHY = 'ADD_BIBLIOGRAPHY'
export const EDIT_BIBLIOGRAPHY = 'EDIT_BIBLIOGRAPHY'
export const SET_BIBLIOGRAPHY_PAGE_SIZE = 'SET_BIBLIOGRAPHY_PAGE_SIZE'
export const SET_BIBLIOGRAPHY_PAGE = 'SET_BIBLIOGRAPHY_PAGE'
export const SET_BIBLIOGRAPHY_SORTED = 'SET_BIBLIOGRAPHY_SORTED'
export const SET_BIBLIOGRAPHY_FILTERED = 'SET_BIBLIOGRAPHY_FILTERED'
export const SET_BIBLIOGRAPHY_RESIZED = 'SET_BIBLIOGRAPHY_RESIZED'

function addBibliography (bibliography) {
  return {
    type: ADD_BIBLIOGRAPHY,
    bibliography,
  }
}

function removeBibliography (bibliography) {
  bibliography.active = 'N'
  return {
    type: DELETE_BIBLIOGRAPHY,
    bibliography,
  }
}

function updateBibliography (bibliography) {
  return {
    type: EDIT_BIBLIOGRAPHY,
    bibliography,
  }
}

function setBibliographyPage(page) {
  return {
    type: SET_BIBLIOGRAPHY_PAGE,
    page,
  }
}

export function handleBibliographyPageChange(page) {
  return (dispatch, getState) => {
    dispatch(setBibliographyPage(page))
  }
}

function setBibliographyPageSize(pageSize, page) {
  return {
    type: SET_BIBLIOGRAPHY_PAGE_SIZE,
    pageSize,
    page
  }
}

function setBibliographySorted(newSorted, column, shiftKey) {
  return {
    type: SET_BIBLIOGRAPHY_SORTED,
    newSorted,
    column,
    shiftKey
  }
}

function setBibliographyFiltered(filtered, column) {
  return {
    type: SET_BIBLIOGRAPHY_FILTERED,
    filtered,
    column
  }
}

function setBibliographyResized(resized, event) {
  return {
    type: SET_BIBLIOGRAPHY_RESIZED,
    resized,
    event
  }
}

export function handleBibliographyPageSizeChange(pageSize, page) {
  return (dispatch, getState) => {
    dispatch(setBibliographyPageSize(pageSize, page))
  }
}

export function handleBibliographySortedChange(newSorted, column, shiftKey) {
  return (dispatch, getState) => {
    dispatch(setBibliographySorted(newSorted, column, shiftKey))
  }
}

// When a filter is set or changed, current page = page 1 (0)
export function handleBibliographyFilteredChange(filtered, column) {
  return (dispatch, getState) => {
    dispatch(setBibliographyFiltered(filtered, column))
    dispatch(setBibliographyPage(0))
  }
}

export function handleBibliographyResizedChange(resized, event) {
  return (dispatch, getState) => {
    dispatch(setBibliographyResized(resized, event))
  }
}

export function receiveBibliographies (bibliographies) {
  return {
    type: RECEIVE_BIBLIOGRAPHIES,
    bibliographies,
  }
}

export function handleDeleteBibliography (client, id) {
 return (dispatch, getState) => {
   dispatch(showLoading())
   return deleteBibliography(client, id)
   .then((bibliographyData) => dispatch(removeBibliography(bibliographyData.data.deleteBibliography_M)))
   .then(() => dispatch(hideLoading()))
   .catch((error) => {
    console.error("ERROR =>", error.graphQLErrors.map(x => x.message))
    const errors = {
      errorsText: error.graphQLErrors.map(x => x.message)
    }
    dispatch(receiveErrors(errors))
    dispatch(hideLoading())
  })
 } 
}

export function handleAddBibliography(client, bibliography) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return saveBibliography(client, bibliography)
    .then((bibliographyData) => dispatch(addBibliography(bibliographyData.data.addBibliography_M)))
    .then(() => dispatch(hideLoading()))
    .catch((error) => {
      console.error("ERROR =>", error.graphQLErrors.map(x => x.message))
      const errors = {
        errorsText: error.graphQLErrors.map(x => x.message)
      }
      dispatch(receiveErrors(errors))
      dispatch(hideLoading())
    })
  }
}

export function handleEditBibliography (client, bibliography) {
  return (dispatch, getState) => {
    dispatch(showLoading()) 
    return editBibliography(client, bibliography) //backend change on the database, "editBibliography"
    .then((bibliographyData) => {
      let newBibliographyData = {}
      newBibliographyData['newBibliography'] = bibliographyData.data.updateBibliography_M
      newBibliographyData['originalBibliography'] = bibliography.originalBibliography
      return dispatch(updateBibliography(newBibliographyData))
    })
    .then(() => dispatch(hideLoading()))
    .catch((error) => {
      console.error("ERROR =>", error.graphQLErrors.map(x => x.message))
      const errors = {
        errorsText: error.graphQLErrors.map(x => x.message)
      }
      dispatch(receiveErrors(errors))
      dispatch(hideLoading())
    })  
  }
}
