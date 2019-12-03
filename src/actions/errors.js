export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'

export function receiveErrors (errors) {
  return {
    type: RECEIVE_ERRORS,
    errors,
  }
}
