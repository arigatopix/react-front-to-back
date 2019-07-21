import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true, // เริ่ม fetch ให้ loading ก่อน
    error: null
  };

  // * Send state to Reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // * Action object
  // Load User : เมื่อมีการเข้าเว็บ ให้เอา token ไปไว้ global headers และ  fetch user
  const loadUser = async () => {
    // load token into global headers
    // หลังจาก register และมี token แล้วให้เก็บ token ไว้ทุกที่ เพราะบาง route ใน backend ต้องการ token
    if (localStorage.token) {
      // เช็ค token ใน localStotrage ถ้าไม่มีให้ redirect

      // ส่งไปให้ global header
      setAuthToken(localStorage.token);
    }

    try {
      // *** จะต้องมี token เท่านั้นถึงจะ fetch ข้อมูลได้ จึงต้องกำหนด token ไว้กับ header ก่อน
      // แปลว่าจะต้อง register เข้ามา แล้ว fetch user จาก backend
      const res = await axios.get('/api/auth');

      // ส่ง user ให้ payload
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    try {
      // post ไป backend เอา object จาก Register component (formData)
      const res = await axios.post('/api/users', formData, config);

      // update state
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      // หลังจาก register ก็ให้ loadUser เพื่อเก็บ token ไว้ใน global header
      loadUser();
    } catch (err) {
      // err จะมาจาก backend (msg)
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
        // รับ msg จาก backend (users.js)
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    try {
      // fetch data from backend
      const res = await axios.post('/api/auth', formData, config);

      // update state
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear Error มีเพื่อลบ error message ทุกครั้ง หลังจาก alert ได้แสดงผลไปแล้ว
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
