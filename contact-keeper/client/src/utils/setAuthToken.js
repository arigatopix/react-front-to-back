import axios from 'axios';

const setAuthToken = token => {
  // set token to global ให้ header มี token ไว้ตลอด สำหรับ access ใช้งาน route
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
