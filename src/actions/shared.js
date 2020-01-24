import { getInitialAppData } from '../utils/api'
//import { receiveUsers, handleLoginUser, handleSaveUser } from '../actions/users'
import { receiveStems } from '../actions/stems'
import { receiveAffixes } from '../actions/affixes'
import { receiveRoots } from '../actions/roots'
import { receiveErrors } from '../actions/errors'
import { receiveTexts } from '../actions/texts'
import { receiveBibliographies } from '../actions/bibliography'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialAppData (client) {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialAppData(client)
      .then(({ stems, roots, bibliographies, affixes, texts }) => {
        dispatch(receiveStems(stems))
        dispatch(receiveRoots(roots))
        dispatch(receiveBibliographies(bibliographies))
        dispatch(receiveAffixes(affixes))
        dispatch(receiveTexts(texts))
        dispatch(hideLoading())
      })
      .catch((error) => {
        console.error('this is the error, ', error)
        console.error("ERROR =>", error.graphQLErrors.map(x => x.message))
        let errors = {
          errorsText: []
        }
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          errors = {
            errorsText: error.graphQLErrors.map(x => x.message)
          }
        }
        else if (error.message) {
          errors.errorsText.push(error.message)
        }
        dispatch(receiveErrors(errors))
        dispatch(hideLoading())
      })
  }
}
