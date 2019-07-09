import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

// reflactor มาจาก Static จริงๆ แล้วมันคือการเข้าถึง object อย่างนึงใน ES5 (prototype chain)
Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;

/**
 * ใช้ Link จาก react-router-dom เพื่อเปลี่ยนหน้า (เปลี่ยน Route ด้วย Switch กับ Route)
 * ใช้แทน <a> ได้เลย
 */
