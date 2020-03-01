import { 
    RECEIVE_VOWELS, 
    } from '../actions/vowels';
import {toast} from "react-toastify"
  
  export default function vowels (state = {}, action) {
    switch (action.type) {
      case RECEIVE_VOWELS :
        return {
          ...state,
          ...action.vowels,
        }
      default :
        return state
    }
  }