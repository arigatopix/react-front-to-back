import React from 'react';
import Alert from '../layout/Alert';
import Users from '../users/Users';
import Search from '../users/Search';

const Home = () => {
  return (
    <div>
      <Alert />
      <Users />
      <Search />
    </div>
  );
};

export default Home;
