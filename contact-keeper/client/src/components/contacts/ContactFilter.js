import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const { filterContacts, clearFilter, filtered } = contactContext;

  // ใช้ useRef เพราะต้องการ reference ข้อมูลใน html tag
  // ! อย่าลืม ref={text} ใน form element
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      // ใช้ข้อมูลจาก ref
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      // เช็ค input element ว่ามีข้อความมั้ย

      // action creator เอาข้อความส่งไปให้ reducer เพื่อ lookup contacts object
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
