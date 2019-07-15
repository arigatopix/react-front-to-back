import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
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
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          // รับ array ที่มี object มา
          // ถ้า id ตรงก็ให้ update ทั้งหมดเป็น payload ..  ถ้าไม่ใช่ก็ให้คงเดิม
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ) // return array ที่ตรงกับเงื่อนไข (ลบที่ไม่ตรงเงื่อนไขออก)
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload // contact object
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          // เช็ค text กับ ข้อมูลใน state.contacts

          // regular expression
          const regex = new RegExp(`${action.payload}`, 'gi');
          // case insensitive

          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      return state;
  }
};
