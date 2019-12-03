import { getInitialAppData } from '../utils/api'
//import { receiveUsers, handleLoginUser, handleSaveUser } from '../actions/users'
import { receiveNavBar } from '../actions/navbar'
import { receiveStems, handleStemPageChange, handleStemPageSizeChange } from '../actions/stems'
import { receiveAffixes, handleAffixPageChange, handleAffixPageSizeChange } from '../actions/affixes'
import { receiveRoots, handleRootPageChange, handleRootPageSizeChange } from '../actions/roots'
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
        //dispatch(handleStemPageChange(0))
        //dispatch(handleStemPageSizeChange(10, 0))
        //dispatch(handleAffixPageChange(0))
        //dispatch(handleAffixPageSizeChange(10, 0))
        //dispatch(receiveNavBar(navbar))
        //dispatch(receiveUsers(users))
        dispatch(hideLoading())
      })
  }
}
