import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: //ใช้ reducer เดียวกับ REGISTER_SUCCESS
      // * send token to localStorage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload, // ? มีข้อมูลมาหลายอย่าง
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ERROR: // ให้ทำเหมือนกับ REGISTER_FAIL
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      // remove token from localStorage
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload // ข้อความมาจาก backend
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
