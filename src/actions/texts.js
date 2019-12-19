export const RECEIVE_TEXTS = 'RECEIVE_TEXTS'
export const SET_TEXT_PAGE_SIZE = 'SET_TEXT_PAGE_SIZE'
export const SET_TEXT_PAGE = 'SET_TEXT_PAGE'
export const SET_TEXT_SORTED = 'SET_TEXT_SORTED'
export const SET_TEXT_FILTERED = 'SET_TEXT_FILTERED'
export const SET_TEXT_RESIZED = 'SET_TEXT_RESIZED'


function setTextPage(page) {
  return {
    type: SET_TEXT_PAGE,
    page,
  }
}

export function handleTextPageChange(page) {
  return (dispatch, getState) => {
    dispatch(setTextPage(page))
  }
}

function setTextPageSize(pageSize, page) {
  return {
    type: SET_TEXT_PAGE_SIZE,
    pageSize,
    page
  }
}

function setTextSorted(newSorted, column, shiftKey) {
  return {
    type: SET_TEXT_SORTED,
    newSorted,
    column,
    shiftKey
  }
}

function setTextFiltered(filtered, column) {
  return {
    type: SET_TEXT_FILTERED,
    filtered,
    column
  }
}

function setTextResized(resized, event) {
  return {
    type: SET_TEXT_RESIZED,
    resized,
    event
  }
}

export function handleTextPageSizeChange(pageSize, page) {
  return (dispatch, getState) => {
    dispatch(setTextPageSize(pageSize, page))
  }
}

export function handleTextSortedChange(newSorted, column, shiftKey) {
  return (dispatch, getState) => {
    dispatch(setTextSorted(newSorted, column, shiftKey))
  }
}

export function handleTextFilteredChange(filtered, column) {
  return (dispatch, getState) => {
    dispatch(setTextFiltered(filtered, column))
    dispatch(setTextPage(0))
  }
}

export function handleTextResizedChange(resized, event) {
  return (dispatch, getState) => {
    dispatch(setTextResized(resized, event))
  }
}

export function receiveTexts (texts) {
  return {
    type: RECEIVE_TEXTS,
    texts,
  }
}
