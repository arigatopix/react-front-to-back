import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    // ถ้า filtered มีข้อความให้ map filtered .. ถ้า null ให้ map contacts array
    // มี contacts และไม่ loading ให้แสดง component
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((
                contact // ค้นหา contact
              ) => (
                <CSSTransition key={contact._id} timeout={200}>
                  <ContactItem contact={contact} key={contact.id} />
                </CSSTransition>
              ))
            : contacts.map((
                contact // Show contacts
              ) => (
                <CSSTransition key={contact._id} timeout={500}>
                  <ContactItem contact={contact} key={contact.id} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
