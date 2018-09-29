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
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
