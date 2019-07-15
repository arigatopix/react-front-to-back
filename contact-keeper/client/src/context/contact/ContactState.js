import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  SET_ALERT,
  CLEAR_ALERT,
  REMOVE_ALERT
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        type: 'personal',
        name: 'Sara White',
        email: 'swhite@gmail.com',
        phone: '333-333-3333'
      },
      {
        id: 2,
        type: 'professional',
        name: 'Sam Smith',
        email: 'ssmith@gmail.com',
        phone: '111-111-1111'
      }
    ]
  };

  // * Send state to Reducer
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // * Actions
  // Add contact
  const addContact = contact => {
    // * contact มาเป็น object

    // ใช้แบบ local ก็เลยให้ uuid สร้าง id ให้ไปก่อน
    contact.id = uuid.v4();

    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
