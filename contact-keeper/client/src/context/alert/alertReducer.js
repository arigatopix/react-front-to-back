import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload); // ถ้า id ไม่ตรง ให้ return กลับไปแสดง alert เหมือนเดิม
    default:
      return state;
  }
};
