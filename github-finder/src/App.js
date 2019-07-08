import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import axios from 'axios';

class App extends Component {
  state = {
    // first load ให้เป็น empty array เพื่อไม่ให้ error
    users: [],
    loading: false,
    alert: null
  };

  // * helper function
  searchUsers = async text => {
    // รับ data จากล่างขึ้นบน จาก Search (ผ่าน arg) > App component (call function)
    // fetch ข้อมูลจาก github api https://developer.github.com/v3/search/#search-users

    // loading for spinner ..
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // ส่งข้อมูลจาก api ไป App > Users > UserItem
    // เมื่อ fetch จะได้ object ซึ่ง users อยู่ใน items property จึงต้องใช้ users: res.data.item
    this.setState({ users: res.data.items, loading: false });
  };

  // * Clear Users from state ต้อง clear จาก Search component
  clearUsers = () => {
    // กด clear ปุ้บ users ให้เป็น empty array
    this.setState({ users: [], loading: false });
  };

  // * Show Alert
  setAlert = (msg, type) => {
    // รับ msg กับ type จาก child component
    // ส่ง state ไปหา Alert Component เพื่อแสดงผล
    this.setState({ alert: { msg, type } });

    // เอา alert ออก
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, loading, alert } = this.state;
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <Alert alert={alert} />
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route path="/about" exact component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

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
 *  - Router ครอบทุก component
 *  - Switch สำหรับบอกว่า Route แสดงผล render หรือ component แตกต่างไปตาม path
 *  - อย่าลืม !!! component ต้องครอบด้วย <div> ถ้าไม่ชอบก็ใช้ Fragment
 */
