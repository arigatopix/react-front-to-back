import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // * Search Users รับข้อมูลจาก Users component (input)
  const searchUsers = async text => {
    // fetch ข้อมูลจาก github api

    // 1) loading for spinner ..
    setLoading(true);

    // 2) fetch ข้อมูลจาก api https://developer.github.com/v3/search/#search-users
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // เมื่อ fetch จะได้ object ซึ่ง users อยู่ใน items property จึงต้องใช้ users: res.data.items
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get single github user
  const getUser = async username => {
    // รับ username จาก Users component
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  };

  // Get user repos
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUserRepos(res.data);
    setLoading(false);
  };

  // Clear Users from state ต้อง clear จาก Search component
  const clearUsers = () => {
    // กด clear ปุ้บ users ให้เป็น empty array
    setUsers([]);
  };

  // Show Alert
  const showAlert = (msg, type) => {
    // รับ msg กับ type จาก Users (child component)
    // ส่ง state ไปหา Alert Component เพื่อแสดงผล
    // ! ต้องส่งไปเป็น object
    setAlert({ msg, type });

    // เอา alert ออก
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Alert alert={alert} />
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    showAlert={showAlert}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route
              path="/user/:login"
              exact
              render={props => (
                <User
                  {...props}
                  loading={loading}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                />
              )}
            />
            <Route path="/about" exact component={About} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

/**
 * NOTE : JSX instead html
 * - class > className
 * - for > htmlFor
 * - ใน JSX (ใน return) ต้องมี 1 element เท่านั้น คือ div
 * - ถ้าไม่อยากใช้ div จะใช้ <React.Fragment> แทน ซึ่งจะไม่ render ในหน้า html หรือจะใช้ <> ก็ได้แต่บางทีจะมีปัญหา
 * =====
 * JSX
 *  - สามารถใช้ JavaScript ใน JSX ได้ โดยใช้ {javascript code}
 *  - สร้าง function ใน function render ไม่ต้องใช้ this
 *  - สร้าง function ใน class ใช้ this.foo() เพื่อชี้ไปยัง object ใน class
 * ====
 * react-router-dom :
 *  - Router ครอบทุก component เพื่อบอกว่าจะใช้ react-router-dom ตัวนี้จะดู path หลัง localhost
 *  - Route บอก path ที่จะไป และให้แสดงผลอะไร เช่น component
 *    - ตรง Route อันแรก ..
 *        - คำสั่ง render คือ render JSX หรือแสดง JSX จาก component ให้ใช้คำสั่ง component={JSXcomponent} แทน
 *        - คำสั่ง render ต้องผ่าน arrow function ถ้ามี nested
 *        - https://reacttraining.com/react-router/core/api/Route/render-func
 *        - กรณีมี variable หลัง path เช่น /user/:login โดย :login ส่งผ่านให้ child props .. this.props.match.param.login
 * ====
 * - Route ตรง User component เราต้องการส่งข้อมูลผ่าน props และยังต้องใช้ Route จึงต้องใช้ render={(props) => (<User />)} props แทนที่จะเป็น component={User}
 *  - ปกติถ้าใช้ component จะส่งผ่าน variable :login ผ่าน props ได้เลย แต่ตอนนี้เราต้องการส่ง state (user, loading) ผ่านลงไปที่ User ด้วยจึงต้องกำหนด spread operations
 *  - render={(props) => (<User { ...props }/>)}
 *  - { ...props } ... ใน User component จะเรียก variable(ที่พิมพ์มาใน url) ผ่าน this.props.match.params.login และมี props อื่นๆ ที่ต้องเรียก เช่น props.location จึงใช้ Spread operations
 *  - getUser เป็น callback function โดยรับ username มาจาก child ..params.login
 *  - user คือส่ง state จาก App (Parent) ให้ User (child)
 * ====
 *  - Switch ใช้เพื่อแสดงผล Route อันใดอันหนึ่ง เพราะปกติ Route พยายามแสดงผล component ตามที่ path บอก เช่น path="/" กับ path="/about" จะแสดงผล component ทั้ง / และ about
 *  - อย่าลืม !!! component ต้องครอบด้วย <div> ถ้าไม่ชอบก็ใช้ Fragment
 */
