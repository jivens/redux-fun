import { 
    RECEIVE_SPELLINGS, 
    } from '../actions/spellings';
import {toast} from "react-toastify"
  
  export default function spellings (state = {}, action) {
    switch (action.type) {
      case RECEIVE_SPELLINGS :
        return {
          ...state,
          ...action.spellings,
        }
      default :
        return state
    }
  }
  