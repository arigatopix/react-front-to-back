import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    text: ''
  };

  static PropType = {
    searchUsers: PropTypes.func.isRequired
  };

  // รับ event จาก tag input ต้องสร้าง function เอง
  onChange = e => {
    // รับ value จาก input tag
    // กรณีมี name ใน input tag หลายอันมาก สามารถแทน key ของ state เป็น javascript ปกติคือ [e.target.name] ถ้า name ใน tag เป็น email ... key ของ setState ก็จะเป็น email
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    // ทำหน้าที่รับ value แล้วส่งให้ Parent Component ผ่าน props
    this.props.searchUsers(this.state.text);

    this.setState({ text: '' });

    // ป้องกัน behavior ไม่ให้ส่ง submit และ reload page
    e.preventDefault();
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={this.state.text}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
    );
  }
}

export default Search;

/**
 ** การรับ text input จาก client ..
 * ใน tag input จะรับข้อมูลผ่าน property value
 * และ update state ของ value ได้จะต้องมี helper function onChange มารับ และ update state
 ** การ Submit ข้อมูล ใช้ helper function ใน tag <form>
    - ใช้ event onSubmit ดูการ submit form
    - ส่งข้อมูลจาก input ให้กับ Parent Component เพื่อ fetch ข้อมูล
 */
