'use strict';

import React from 'react';
import '../styles/DataLogger.css';

class DataLoggerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const log = this.props.inputData.map((data) => {
      <div>Longitude: {data.longitude}, Latitude: {data.latitude}</div>
    });
    return (
      <div className="datalogger-component">
        {log}
      </div>
    );
  }
}

DataLoggerComponent.displayName = 'DataLoggerComponent';

// Uncomment properties you need
// DataLoggerComponent.propTypes = {};
// DataLoggerComponent.defaultProps = {};

export default DataLoggerComponent;
