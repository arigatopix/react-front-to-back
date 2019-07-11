import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

const GithubState = props => {
  const initState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  // * Action Creator ส่ง type กับ payload ให้ Reducer
  const [state, dispatch] = useReducer(GithubReducer, initState);
  // เช็ค state จาก reducer และ dispatch คือการส่ง action กับ payload

  // Search Users
  const searchUsers = async text => {
    // 1) loading for spinner .. by Action Creator
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // ส่ง dispatch ให้ Reducer จะต้องมี type (action) payload (new state)
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  // Get User
  const getUser = async username => {
    // action creator
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data
    });
    //! อย่าลืม ไปเพิ่ม getUser ใน value
  };

  // Get User Repos
  const getUserRepos = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS, payload: [] });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Show Alert
  const showAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        type
      }
    });

    // เอา alert ออก
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT
        }),
      3000
    );
  };

  // * ส่ง state, function ผ่าน Context.Provider โดยใช้ value property โดยทำการส่งเป็น object !!
  // * อย่าลืม Context ต้องครอบ Component ที่จะใช้ state จึงต้องเรียกทุก Component จาก props.children
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        clearUsers,
        getUserRepos,
        showAlert,
        alert: state.alert
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;

// * State Cycle ...
// Action creator > Action > dispatch (ส่ง type and payload) > Reducer (เอา action object ไปจัดการ action.type, action.payload ... return state) > Store
// จากนั้น ใช้ state โดยContext Object ผ่าน value > Component เรียก state โดยใช้ useContext(ContextObject)
// วิธีปรับคือ สร้าง action > ตั้งค่าใน Reducer> ไปปรับใน Component ที่จะใช้ State จากContext
// ข้อดีคือ ไม่ต้องส่ง STATE, CALLBACK FUNCTION ผ่านทุก Component ทั้ง UP และ DOWN
// =====
// ** GithubState : เหมือนเป็น Action creator คอยส่ง Action (dispatch) ให้ reducer และ Wrap ทุก component เพื่อให้ Context ส่ง State
// =====
// ** GithubContext : เป็นท่อส่ง state, value จะต้องเป็น Component Context.Provider ครอบทุก Component ที่จะใช้ State (githubContext คือ object ตัวพิมพ์ใหญ่ GithubContext คือ Component )
// ** GithubReducer : คอย update state
