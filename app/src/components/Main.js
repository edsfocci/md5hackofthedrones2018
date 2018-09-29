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
        <div className="mt-3">
          <div id='permissions'>
            <div className="d-flex flex-row">
              <p className="mr-3">Record:</p>
              <form>
                <label className="ml-3 mr-2">Audio</label>
                <input type="radio" name="media" value="audio" defaultChecked id="mediaAudio"/>
              </form>
            </div>
            <button className="btn btn-primary"  id='optInBtn'>Request Stream</button>
          </div>
          <div id='btns'>
            <button  className="btn btn-success" id='start'>Start</button>
            <button  className="btn btn-danger" id='stop'>Stop</button>
          </div>
          <div>
            <ul  className="list-unstyled" id='ul'></ul>
          </div>

        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
