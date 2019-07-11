import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
  // ใช้ ข้อมูลจาก Context
  const githubContext = useContext(GithubContext);

  // destructuring จากเดิม githubContext.user และ githubContext.loading
  const { users, loading } = githubContext;

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

// ตั้งค่า style อยู่นอก class
const userStyle = {
  // setting object
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
