import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    );
  }
};

// PropTypes เอาไว้เช็ค incomming ได้ด้วย
Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

// ตั้งค่า style อยู่นอก class
const userStyle = {
  // setting object
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;

// สร้าง style ของแต่ละ component ได้จาก userStyle ใน JSX ใช้ {}
