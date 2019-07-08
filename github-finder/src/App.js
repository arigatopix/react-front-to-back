import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';

class App extends Component {
  state = {
    // first load ให้เป็น empty array เพื่อไม่ให้ error
    users: [],
    loading: false
  };

  // helper function
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

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
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
 */
