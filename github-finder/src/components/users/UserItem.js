import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  // destructuring const { login, avatar_url, html_url  } = this.props.user

  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <div>
        <a href={html_url} className="btn btn-dark btn-sm my-1">
          More
        </a>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  // PropTypes ใช้เช็คข้อมูลจาก User component คำสั่ง ptor
  user: PropTypes.object.isRequired
};

export default UserItem;

/**
 * DESTRUCTURING
 * const obj1 = {
 *  id: 1
 *  username: 'John'
 * }
 *
 * const id1 = obj1.id
 * const username1 = obj1.username
 *
 * แปลงเป็น
 * const { id1, username1 } = obj1
 */
