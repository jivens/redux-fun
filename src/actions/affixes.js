import { deleteAffix } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_AFFIXES = 'RECEIVE_AFFIXES'
export const DELETE_AFFIX = 'DELETE_AFFIX'

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
