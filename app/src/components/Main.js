require('normalize.css/normalize.css');
require('styles/App.css');
import React from 'react';
import './getAudio';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Monkey Jelly</h1>
        </header>
          <div>
            <div>
              <h2>Audio record and playback</h2>
              <p>
                <button id="startRecord" className="btn ml-3">start</button>
                <button id="stopRecord" className="btn" disabled>stop</button>
              </p>
              <p>
                <audio id="recordedAudio" />
                <a id="audioDownload" />
              </p>
            </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
