import { getInitialAppData } from '../utils/api'
//import { receiveUsers } from '../actions/users'
import { receiveStems, handleStemPageChange, handleStemPageSizeChange } from '../actions/stems'
import { receiveAffixes, handleAffixPageChange, handleAffixPageSizeChange } from '../actions/affixes'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialAppData (client) {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialAppData(client)
      .then(({ stems, affixes, users }) => {
        dispatch(receiveStems(stems))
        dispatch(handleStemPageChange(0))
        dispatch(handleStemPageSizeChange(10, 0))
        dispatch(handleAffixPageChange(0))
        dispatch(handleAffixPageSizeChange(10, 0))
        dispatch(receiveAffixes(affixes))
        //dispatch(receiveUsers(users))
        dispatch(hideLoading())
      })
  }
}
