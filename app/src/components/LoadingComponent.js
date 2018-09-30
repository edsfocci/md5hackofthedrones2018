'use strict';

import React from 'react';
import '../styles/Loading.css';

class LoadingComponent extends React.Component {
  render() {
    return (
      <div className="loading-component">
        <div className="loading-text">LOADING APPLICATION</div>
      </div>
    );
  }
}

LoadingComponent.displayName = 'LoadingComponent';

// Uncomment properties you need
// LoadingComponent.propTypes = {};
// LoadingComponent.defaultProps = {};

export default LoadingComponent;
