export const RECEIVE_VOWELS = 'RECEIVE_VOWELS'


export function receiveVowels (vowels) {
  return {
    type: RECEIVE_VOWELS,
    vowels,
  }
}