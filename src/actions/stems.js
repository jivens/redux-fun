export const RECEIVE_STEMS = 'RECEIVE_STEMS'

export function receiveStems (stems) {
  return {
    type: RECEIVE_STEMS,
    stems,
  }
}
