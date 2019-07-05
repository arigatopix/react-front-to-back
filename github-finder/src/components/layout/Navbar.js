import React, { Component } from "react";
import PropTypes from "prop-types";

export class Navbar extends Component {
  // Default Props สำหรับไม่มีการส่ง props มาจาก Parent
  static defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github"
  };

  // propTypes คือ props checking ว่า props ที่ส่งมาจาก Parent หรือกำหนดจาก defaultProps มี datatype ถูกต้องหรือไม่
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };

  render() {
    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={this.props.icon} /> {this.props.title}
        </h1>
      </nav>
    );
  }
}

export default Navbar;
