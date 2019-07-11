import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  // ใช้ state ผ่าน Context คล้ายของ Stephen สอนคือเรียกโดยใช้ alertContext = this.context.alert
  const alertContext = useContext(AlertContext);

  // Destructuring ปกติจะใช้งานคือ alertContext.alert.type
  const { alert } = alertContext;

  // รับ state ผ่าน props
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    )
  );
};

export default Alert;

// ref = class base
// rfa = function base
