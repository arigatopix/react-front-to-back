import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
  // รับ state จาก alertState ( useReducer .. )
  switch (action.type) {
    case SET_ALERT:
      return action.payload; // alert payload ส่งแค่ object msg กับ type
    case REMOVE_ALERT:
      return null;
    default:
      return state;
  }
};
