import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // ...rest คือถ้ามี component property หรืออื่นๆ เข้ามา จะ Overwrite ของเดิมออก
  // จะเอาไปครอบที่ App.js เพื่อรับ props

  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  // เช็คว่า auth มั้ย กับ load user เสร็จรึยัง
  // (is not Authenticated กับ is not loading)

  return (
    <div>
      <Route
        {...rest}
        render={props =>
          !isAuthenticated && !loading ? (
            <Redirect to="/login" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;

// มีไว้ render เฉพาะ isAuthenticated
// redirect ถ้าไม่ login ก่อน
