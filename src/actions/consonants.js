export const RECEIVE_CONSONANTS = 'RECEIVE_CONSONANTS'


export function receiveConsonants (consonants) {
  return {
    type: RECEIVE_CONSONANTS,
    consonants,
  }
}
