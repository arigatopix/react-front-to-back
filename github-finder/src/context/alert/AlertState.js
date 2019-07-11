import React, { useReducer } from 'react';
import AlertContext from '../alert/alertContext';
import AlertReducer from '../alert/alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

// Init State & Action Creator
const AlertState = props => {
  // props ใช้ใน Context.Provider Component
  const initState = {
    alert: null
  };

  // *** Current state กับ ส่ง action ผ่าน dispatch method ให้กับ reducer
  const [state, dispatch] = useReducer(AlertReducer, initState);

  // Action Creator, ส่ง Action ผ่าน dispatch
  const setAlert = (msg, type) => {
    // alert when call function รับ msg กับ type มา
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        type
      }
    });

    // *** remove alert ต้องเรียกแบบ CALL BACK function
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT
        }),
      3000
    );
  };

  // Context.Provider ส่ง state ผ่าน value props
  // ! ต้องครอบทุก component เพื่อส่ง value ด้วย Consumer
  return (
    <AlertContext.Provider
      value={{
        setAlert,
        alert: state.alert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
