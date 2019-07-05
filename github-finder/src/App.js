import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    // first load ให้เป็น empty array เพื่อไม่ให้ error
    users: [],
    loading: false
  };

  // fetch data from api when first load
  async componentDidMount() {
    // first load แสดง spinner รอระหว่าง fetch
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users`);
    // ใช้ .then (จะได้ promises) หรือ async await ก็ได้

    this.setState({ users: res.data, loading: false });
    console.log(res.data);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Users />
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
