import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
  // รับ state จาก alertState ( useReducer .. )
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: null
      };
    default:
      return state;
  }
};
