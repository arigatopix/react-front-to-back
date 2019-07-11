import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

export default (state, action) => {
  // เอา action จาก GithubState และทำการ update state เดิม
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: action.payload
      };
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

// แผนกคอยเอา action มาอัพเดท state ต้องมี 2 อย่างคือ action กับ payload เพื่อ update state เดิม
// syntax คือ { ...state, new state }
// ถ้าเป็น object เดียวกัน ขวาจะ replace ด้านซ้าย ถ้าไม่ใช่จะถูก add
