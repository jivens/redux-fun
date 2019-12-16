import { deleteRoot, saveRoot, editRoot } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveErrors } from '../actions/errors'

export const RECEIVE_ROOTS = 'RECEIVE_ROOTS'
export const DELETE_ROOT = 'DELETE_ROOT'
export const ADD_ROOT = 'ADD_ROOT'
export const EDIT_ROOT = 'EDIT_ROOT'
export const SET_ROOT_PAGE_SIZE = 'SET_ROOT_PAGE_SIZE'
export const SET_ROOT_PAGE = 'SET_ROOT_PAGE'
export const SET_ROOT_SORTED = 'SET_ROOT_SORTED'
export const SET_ROOT_FILTERED = 'SET_ROOT_FILTERED'
export const SET_ROOT_RESIZED = 'SET_ROOT_RESIZED'

function addRoot (root) {
  return {
    type: ADD_ROOT,
    root,
  }
}

function removeRoot (root) {
  root.active = 'N'
  return {
    type: DELETE_ROOT,
    root,
  }
}

function updateRoot (root) {
  return {
    type: EDIT_ROOT,
    root,
  }
}

function setRootPage(page) {
  return {
    type: SET_ROOT_PAGE,
    page,
  }
}

export function handleRootPageChange(page) {
  return (dispatch, getState) => {
    dispatch(setRootPage(page))
  }
}

function setRootPageSize(pageSize, page) {
  return {
    type: SET_ROOT_PAGE_SIZE,
    pageSize,
    page
  }
}

function setRootSorted(newSorted, column, shiftKey) {
  return {
    type: SET_ROOT_SORTED,
    newSorted,
    column,
    shiftKey
  }
}

function setRootFiltered(filtered, column) {
  return {
    type: SET_ROOT_FILTERED,
    filtered,
    column
  }
}

function setRootResized(resized, event) {
  return {
    type: SET_ROOT_RESIZED,
    resized,
    event
  }
}

export function handleRootPageSizeChange(pageSize, page) {
  return (dispatch, getState) => {
    dispatch(setRootPageSize(pageSize, page))
  }
}

export function handleRootSortedChange(newSorted, column, shiftKey) {
  return (dispatch, getState) => {
    dispatch(setRootSorted(newSorted, column, shiftKey))
  }
}

// When a filter is set or changed, current page = page 1 (0)
export function handleRootFilteredChange(filtered, column) {
  return (dispatch, getState) => {
    dispatch(setRootFiltered(filtered, column))
    dispatch(setRootPage(0))
  }
}

export function handleRootResizedChange(resized, event) {
  return (dispatch, getState) => {
    dispatch(setRootResized(resized, event))
  }
}

export function receiveRoots (roots) {
  return {
    type: RECEIVE_ROOTS,
    roots,
  }
}

export function handleDeleteRoot (client, id) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return deleteRoot(client, id)
    .then((rootData) => dispatch(removeRoot(rootData.data.deleteRoot_M)))
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

export function handleAddRoot (client, root) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return saveRoot(client, root)
    .then((rootData) => dispatch(addRoot(rootData.data.addRoot_M)))
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

export function handleEditRoot (client, root) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return editRoot(client, root) //backend change on the database, "editRoot"
    .then((rootData) => {
      let newRootData = {}
      newRootData['newRoot'] = rootData.data.updateRoot_M
      newRootData['originalRoot'] = root.originalRoot
      //console.log("handleEditRoot, new Root: ", newRootData['newRoot'])
      //console.log("handleEditRoot, old Root: ", newRootData['originalRoot'])
      return dispatch(updateRoot(newRootData))// redux store change
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
