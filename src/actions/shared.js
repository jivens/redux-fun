import { getInitialAppData } from '../utils/api'
//import { receiveUsers, handleLoginUser, handleSaveUser } from '../actions/users'
import { receiveStems } from '../actions/stems'
import { receiveAffixes } from '../actions/affixes'
import { receiveRoots } from '../actions/roots'
import { receiveErrors } from '../actions/errors'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialAppData (client) {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialAppData(client)
      .then(({ stems, roots, affixes, errors }) => {
        dispatch(receiveStems(stems))
        dispatch(receiveRoots(roots))
        dispatch(receiveAffixes(affixes))
        dispatch(receiveErrors(errors))
        dispatch(hideLoading())
      })
  }
}
