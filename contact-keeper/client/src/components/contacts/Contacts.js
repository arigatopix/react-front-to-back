import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((
              contact // ค้นหา contact
            ) => (
              <CSSTransition key={contact.id} timeout={200}>
                <ContactItem contact={contact} key={contact.id} />
              </CSSTransition>
            ))
          : contacts.map((
              contact // Show contacts
            ) => (
              <CSSTransition key={contact.id} timeout={500}>
                <ContactItem contact={contact} key={contact.id} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
