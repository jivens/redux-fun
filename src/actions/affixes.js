import { deleteAffix, saveAffix } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_AFFIXES = 'RECEIVE_AFFIXES'
export const DELETE_AFFIX = 'DELETE_AFFIX'
export const ADD_AFFIX = 'ADD_AFFIX'
export const SET_AFFIX_PAGE_SIZE = 'SET_AFFIX_PAGE_SIZE'
export const SET_AFFIX_PAGE = 'SET_AFFIX_PAGE'
export const SET_AFFIX_SORTED = 'SET_AFFIX_SORTED'
export const SET_AFFIX_FILTERED = 'SET_AFFIX_FILTERED'
export const SET_AFFIX_RESIZED = 'SET_AFFIX_RESIZED'

function addAffix (affix) {
  return {
    type: ADD_AFFIX,
    affix,
  }
}

function removeAffix (affix) {
  affix.active = 'N'
  return {
    type: DELETE_AFFIX,
    affix,
  }
}

function setAffixPage(page) {
  return {
    type: SET_AFFIX_PAGE,
    page,
  }
}

export function handleAffixPageChange(page) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setAffixPage(page))
  }
}

function setAffixPageSize(pageSize, page) {
  return {
    type: SET_AFFIX_PAGE_SIZE,
    pageSize,
    page
  }
}

function setAffixSorted(newSorted, column, shiftKey) {
  return {
    type: SET_AFFIX_SORTED,
    newSorted,
    column,
    shiftKey
  }
}

function setAffixFiltered(filtered, column) {
  return {
    type: SET_AFFIX_FILTERED,
    filtered,
    column
  }
}

function setAffixResized(resized, event) {
  return {
    type: SET_AFFIX_RESIZED,
    resized,
    event
  }
}

export function handleAffixPageSizeChange(pageSize, page) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setAffixPageSize(pageSize, page))
  }
}

export function handleAffixSortedChange(newSorted, column, shiftKey) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setAffixSorted(newSorted, column, shiftKey))
  }
}

// When a filter is set or changed, current page = page 1 (0)
export function handleAffixFilteredChange(filtered, column) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setAffixFiltered(filtered, column))
    dispatch(setAffixPage(0))
  }
}

export function handleAffixResizedChange(resized, event) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(setAffixResized(resized, event))
  }
}

export function receiveAffixes (affixes) {
  return {
    type: RECEIVE_AFFIXES,
    affixes,
  }
}

export function handleDeleteAffix (client, id) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return deleteAffix(client, id)
    .then((affixData) => dispatch(removeAffix(affixData.data.deleteAffix_M)))
    .then(() => dispatch(hideLoading()))
  }
}

export function handleAddAffix (client, affix) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveAffix(client, affix)
    .then((affixData) => dispatch(addAffix(affixData.data.addAffix_M)))
    .then(() => dispatch(hideLoading()))
  }
}
