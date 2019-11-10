import { getInitialData, getInitialAppData } from '../utils/api'
//import { receiveUsers } from '../actions/users'
import { receivePolls } from '../actions/polls'
import { receiveStems } from '../actions/stems'
import { receiveAffixes, handleAffixPageChange, handleAffixPageSizeChange } from '../actions/affixes'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, polls }) => {
        //dispatch(receiveUsers(users))
        dispatch(receivePolls(polls))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function handleInitialAppData (client) {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialAppData(client)
      .then(({ stems, affixes, users }) => {
        dispatch(receiveStems(stems))
        dispatch(handleAffixPageChange(0))
        dispatch(handleAffixPageSizeChange(10, 0))
        dispatch(receiveAffixes(affixes))
        //dispatch(receiveUsers(users))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}
