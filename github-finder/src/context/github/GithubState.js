// เหมือนเป็น Action คอยส่งให้ reducer
import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USER,
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
    loading: false
  };
};
