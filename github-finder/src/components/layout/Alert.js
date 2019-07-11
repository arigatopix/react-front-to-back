import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

const Alert = () => {
  const githubContext = useContext(GithubContext);
  const { alert } = githubContext;

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
