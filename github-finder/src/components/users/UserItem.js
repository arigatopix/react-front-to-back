import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserItem = ({ user: { login, avatar_url } }) => {
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
        <Link to={`user/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
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
