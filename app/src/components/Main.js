import React from 'react';
import 'normalize.css/normalize.css';
import '../styles/App.css';
import MapComponent from './MapComponent';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index container">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="row">
          <div className="col-lg-9">
            <MapComponent />
          </div>
        </div>
        <div>
          <button id="start-btn" className="btn">Start recording</button>
          <button id="stop-btn" className="btn" disabled>Stop recording</button>

          <h2>Stored Recordings</h2>
          <ul id="recordingslist"></ul>

          <span id="result"></span>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
