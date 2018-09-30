'use strict';

import React from 'react';
import '../styles/NavBar.css';
import logo from '../images/dropwhite.png';

class NavBarComponent extends React.Component {
  render() {
    return (
      <div className="navbar-component">
        <img className="nav-logo" src={logo} />
      </div>
    );
  }
}

NavBarComponent.displayName = 'NavBarComponent';

// Uncomment properties you need
// NavBarComponent.propTypes = {};
// NavBarComponent.defaultProps = {};

export default NavBarComponent;
