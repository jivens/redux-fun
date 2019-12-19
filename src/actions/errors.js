import { toast } from "react-toastify";

export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'

export function receiveErrors (errors) {
  return function(dispatch){
    dispatch({
      type: RECEIVE_ERRORS,
      errors,
    });
    errors.errorsText.forEach(function(error) {
        toast.error(error)
    })
  }
}

