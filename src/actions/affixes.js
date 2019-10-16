export const RECEIVE_AFFIXES = 'RECEIVE_AFFIXES'

export function receiveAffixes (affixes) {
  return {
    type: RECEIVE_AFFIXES,
    affixes,
  }
}
