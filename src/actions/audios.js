import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveErrors } from '../actions/errors'

export const RECEIVE_AUDIOS = 'RECEIVE_AUDIOS'
export const SET_AUDIO_PAGE_SIZE = 'SET_AUDIO_PAGE_SIZE'
export const SET_AUDIO_PAGE = 'SET_AUDIO_PAGE'
export const SET_AUDIO_SORTED = 'SET_AUDIO_SORTED'
export const SET_AUDIO_FILTERED = 'SET_AUDIO_FILTERED'
export const SET_AUDIO_RESIZED = 'SET_AUDIO_RESIZED'

function setAudioPage(page) {
  return {
    type: SET_AUDIO_PAGE,
    page,
  }
}

export function handleAudioPageChange(page) {
  return (dispatch, getState) => {
    dispatch(setAudioPage(page))
  }
}

function setAudioPageSize(pageSize, page) {
  return {
    type: SET_AUDIO_PAGE_SIZE,
    pageSize,
    page
  }
}

function setAudioSorted(newSorted, column, shiftKey) {
  return {
    type: SET_AUDIO_SORTED,
    newSorted,
    column,
    shiftKey
  }
}

function setAudioFiltered(filtered, column) {
  return {
    type: SET_AUDIO_FILTERED,
    filtered,
    column
  }
}

function setAudioResized(resized, event) {
  return {
    type: SET_AUDIO_RESIZED,
    resized,
    event
  }
}

export function handleAudioPageSizeChange(pageSize, page) {
  return (dispatch, getState) => {
    dispatch(setAudioPageSize(pageSize, page))
  }
}

export function handleAudioSortedChange(newSorted, column, shiftKey) {
  return (dispatch, getState) => {
    dispatch(setAudioSorted(newSorted, column, shiftKey))
  }
}

// When a filter is set or changed, current page = page 1 (0)
export function handleAudioFilteredChange(filtered, column) {
  return (dispatch, getState) => {
    dispatch(setAudioFiltered(filtered, column))
    dispatch(setAudioPage(0))
  }
}

export function handleAudioResizedChange(resized, event) {
  return (dispatch, getState) => {
    dispatch(setAudioResized(resized, event))
  }
}

export function receiveAudios (audios) {
  return {
    type: RECEIVE_AUDIOS,
    audios,
  }
}

