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

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload] // contacts array ของ initialState: [...object Contacts]
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ) // return array ที่ตรงกับเงื่อนไข (ลบที่ไม่ตรงเงื่อนไขออก)
      };
    default:
      return state;
  }
};
