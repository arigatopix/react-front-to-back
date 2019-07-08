import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    text: ''
  };

  static PropType = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  // รับ event จาก tag input ต้องสร้าง function เอง
  onChange = e => {
    // รับ value จาก input tag
    // กรณีมี name ใน input tag หลายอันมาก สามารถแทน key ของ state เป็น javascript ปกติคือ [e.target.name] ถ้า name ใน tag เป็น email ... key ของ setState ก็จะเป็น email
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    // ป้องกัน behavior ไม่ให้ส่ง submit และ reload page
    e.preventDefault();

    if (!this.state.text) {
      // ถ้า input เป็น empty
      this.props.setAlert('Please enter somthing.', 'ligth');
    } else {
      // ทำหน้าที่รับ value แล้วส่งให้ Parent Component ผ่าน props
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  };

  render() {
    const { clearUsers, showClear } = this.props;

    return (
      <div>
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
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;

/**
 ** การรับ text input จาก client ..
 * ใน tag input จะรับข้อมูลผ่าน property value
 * และ update state ของ value ได้จะต้องมี helper function onChange มารับ และ update state
 ** การ Submit ข้อมูล ใช้ helper function ใน tag <form> (ล่างขึ้นบน)
    - ใช้ event onSubmit ดูการ submit form
    - ส่งข้อมูลจาก input ให้กับ Parent Component เพื่อ fetch ข้อมูล
** this.props.showClear คือถ้ามี Users จะแสดงผลปุ่ม clear
 */
