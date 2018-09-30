'use strict';

import React from 'react';
import '../styles/Loading.css';
import logo from '../images/dropwhite.png';

class LoadingComponent extends React.Component {
  render() {
    return (
      <div className="loading-component">
        <img className="loading-img" src={logo} />
      </div>
    );
  }
}

LoadingComponent.displayName = 'LoadingComponent';

// Uncomment properties you need
// LoadingComponent.propTypes = {};
// LoadingComponent.defaultProps = {};

export default LoadingComponent;
