import { deleteStem } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_STEMS = 'RECEIVE_STEMS'
export const DELETE_STEM = 
'DELETE_STEM'

function removeStem (stem) {
  stem.active = 'N'
  return {
    type: DELETE_STEM,
    stem,
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