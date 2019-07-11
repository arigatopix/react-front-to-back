import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

const Search = () => {
  // * รับข้อมูลจาก Context !!
  const githubContext = useContext(GithubContext);
  const { users, clearUsers, showAlert } = githubContext;

  // * ตั้งค่าแทน state (ส่วนหนึ่งของ Hooks)
  const [text, setText] = useState('');
  // โดย text คือ state ปัจจุบัน
  // setText = เป็น function คล้ายๆ กับ setState({ text: ... })

  // รับ event จาก tag input ต้องสร้าง function เอง
  const onChange = e => {
    // event handler รับ input จาก <input>
    setText(e.target.value);
  };

  const onSubmit = e => {
    // ป้องกัน behavior ไม่ให้ส่ง submit และ reload page
    e.preventDefault();

    if (!text) {
      // ถ้า input เป็น empty (ดูจาก state ปัจจุบัน)
      showAlert('Please enter somthing.', 'ligth');
    } else {
      // ทำหน้าที่รับ value แล้วส่งให้ Parent Component ผ่าน props
      githubContext.searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

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
