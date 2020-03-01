import { 
    RECEIVE_CONSONANTS, 
    } from '../actions/consonants';
import {toast} from "react-toastify"
  
  export default function consonants (state = {}, action) {
    switch (action.type) {
      case RECEIVE_CONSONANTS :
        return {
          ...state,
          ...action.consonants,
        }
      default :
        return state
    }
  }