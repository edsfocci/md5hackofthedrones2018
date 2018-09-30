'use strict';

import React from 'react';
import '../styles/DataLogger.css';

class DataLoggerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let log = (this.props.inputData || []).map((data) => {
      return <div>Longitude: {data.longitude}, Latitude: {data.latitude} Drone Detected {data.isDrone ? 'YES' : 'NO'}</div>
    });
    if (log.length > 200) {
      log = log.slice(-200);
    }
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
