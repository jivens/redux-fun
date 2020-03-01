import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveErrors } from '../actions/errors'

export const RECEIVE_SPELLINGS = 'RECEIVE_SPELLINGS'


export function receiveSpellings (spellings) {
  return {
    type: RECEIVE_SPELLINGS,
    spellings,
  }
}

