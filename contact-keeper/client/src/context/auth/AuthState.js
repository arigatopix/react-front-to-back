import React, { useReducer } from 'react';
import axios from 'axios';
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
  // Load User เมื่อมีการเข้าเว็บ ให้ดึง token ออกมา
  const loadUser = () => console.log('Load user');

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
  const login = () => console.log('login');

  // Logout
  const logout = () => console.log('logout');

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
