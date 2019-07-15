import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  // use context
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  // Click Edit Button ให้ใช้ LifeCycle ดูการเปลี่ยนแปลง state
  useEffect(() => {
    if (current !== null) {
      // ถ้ากด edit ให้เปลี่ยน state เป็น current object
      setContact(current);
    } else {
      // ไม่มี state.current ไม่ต้องทำไร
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]); // ให้ useEffect เมื่อ contactContext หรือ current state เปลี่ยนไป

  // Set State
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  // submit form ก็เปลี่ยน state ที่เป็น object contact
  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  // submit and update action
  const onSubmit = e => {
    if (current === null) {
      // ให้ add contact เมื่อ form เปล่า

      // action creator
      addContact(contact);
    } else {
      // update state (action creator)
      updateContact(contact);
    }

    // set form to blank เรียก function
    clearAll();

    e.preventDefault();
  };

  // clear all from FORM
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
