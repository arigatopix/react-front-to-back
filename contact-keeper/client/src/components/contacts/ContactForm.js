import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  // use context
  const contactContext = useContext(ContactContext);

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
    // action creator
    contactContext.addContact(contact);

    // set form to blank
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });

    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Contact</h2>
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
      />{' '}
      Personal <input type="radio" name="type" value="professional" />{' '}
      Professional
      <div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
