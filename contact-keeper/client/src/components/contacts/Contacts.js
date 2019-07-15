import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    // ถ้า filtered มีข้อความให้ map filtered .. ถ้า null ให้ map contacts array
    <Fragment>
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem contact={contact} key={contact.id} />
          ))
        : contacts.map(contact => (
            <ContactItem contact={contact} key={contact.id} />
          ))}
    </Fragment>
  );
};

export default Contacts;
