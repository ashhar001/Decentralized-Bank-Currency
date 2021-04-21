import React, { Component } from 'react';
import dbank from '../dbank.png';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
            rel="noopener noreferrer"
          >
            <img src={dbank} alt="logo" height="32" />
            <b>dBank</b>
          </a>
        </nav>
      </div>
    )
  }
}

export default Navbar;
