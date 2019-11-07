import { deleteStem, editStem, saveStem } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_STEMS = 'RECEIVE_STEMS'
export const DELETE_STEM = 'DELETE_STEM'
export const ADD_STEM = 'ADD_STEM'
export const EDIT_STEM = 'EDIT_STEM'
export const SET_STEM_PAGE_SIZE = 'SET_STEM_PAGE_SIZE'
export const SET_STEM_PAGE = 'SET_STEM_PAGE'
export const SET_STEM_SORTED = 'SET_STEM_SORTED'
export const SET_STEM_FILTERED = 'SET_STEM_FILTERED'
export const SET_STEM_RESIZED = 'SET_STEM_RESIZED'

function addStem (stem) {
  return {
    type: ADD_STEM,
    stem,
  }
}

function removeStem (stem) {
  stem.active = 'N'
  return {
    type: DELETE_STEM,
    stem,
  }
}

function updateStem (stem) {
  return {
    type: EDIT_STEM,
    stem,
  }
}

function setStemPage(page) {
  return {
    type: SET_STEM_PAGE,
    page,
  }
}

export function handleStemPageChange(page) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setStemPage(page))
  }
}

function setStemPageSize(pageSize, page) {
  return {
    type: SET_STEM_PAGE_SIZE,
    pageSize,
    page
  }
}

function setStemSorted(newSorted, column, shiftKey) {
  return {
    type: SET_STEM_SORTED,
    newSorted,
    column,
    shiftKey
  }
}

function setStemFiltered(filtered, column) {
  return {
    type: SET_STEM_FILTERED,
    filtered,
    column
  }
}

function setStemResized(resized, event) {
  return {
    type: SET_STEM_RESIZED,
    resized,
    event
  }
}

export function handleStemPageSizeChange(pageSize, page) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setStemPageSize(pageSize, page))
  }
}

export function handleStemSortedChange(newSorted, column, shiftKey) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setStemSorted(newSorted, column, shiftKey))
  }
}

// When a filter is set or changed, current page = page 1 (0)
export function handleStemFilteredChange(filtered, column) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setStemFiltered(filtered, column))
    dispatch(setStemPage(0))
  }
}

export function handleStemResizedChange(resized, event) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setStemResized(resized, event))
  }
}

export function receiveStems (stems) {
  return {
    type: RECEIVE_STEMS,
    stems,
  }
}

export function handleDeleteStem (client, id) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return deleteStem(client, id)
    .then((stemData) => dispatch(removeStem(stemData.data.deleteStem_M)))
    .then(() => dispatch(hideLoading()))
  }
}

export function handleAddStem (client, stem) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveStem(client, stem)
    .then((stemData) => dispatch(addStem(stemData.data.addStem_M)))
    .then(() => dispatch(hideLoading()))
  }
}

export function handleEditStem (client, stem) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return editStem(client, stem) //backend change on the database, "editStem"
    .then((stemData) => {
      let newStemData = {}
      newStemData['newStem'] = stemData.data.updateStem_M
      newStemData['originalStem'] = stem.originalStem
      //console.log("handleEditStem, new Stem: ", newStemData['newStem'])
      //console.log("handleEditStem, old Stem: ", newStemData['originalStem'])
      return dispatch(updateStem(newStemData))// redux store change
    })
    .then(() => dispatch(hideLoading()))
  }
}
