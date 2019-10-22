import { deleteAffix, saveAffix } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_AFFIXES = 'RECEIVE_AFFIXES'
export const DELETE_AFFIX = 'DELETE_AFFIX'
export const ADD_AFFIX = 'ADD_AFFIX'

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
