export const RECEIVE_NAVBAR = 'RECEIVE_NAVBAR'

export function receiveNavBar (navbar) {
  console.log('this is navbar in actions ', navbar)
  return {
    type: RECEIVE_NAVBAR,
    navbar,
  }
}
