import React from 'react';
import 'normalize.css/normalize.css';
import '../styles/App.css';
import MapComponent from './MapComponent';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <MapComponent />
          <div>
              <h2>Audio record and playback</h2>
              <p>
                <a id="download">Download</a>
                <button id="stop">Stop</button>
              </p>
              <p>
                <audio id="player" controls></audio>
                <a id="audioDownload" />
              </p>
          </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
