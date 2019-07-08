import React from 'react';

const Alert = ({ alert }) => {
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
