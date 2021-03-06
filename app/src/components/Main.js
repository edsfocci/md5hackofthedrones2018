import React from 'react';
import 'normalize.css/normalize.css';
import '../styles/App.css';
import MapComponent from './MapComponent';
import DataLoggerComponent from './DataLoggerComponent';
import LoadingComponent from './LoadingComponent';
import NavBarComponent from './NavBarComponent';
import { SocketService } from '../services/Socket';

import config from 'config';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      inputData: [],
      isConnected: false,
      appLoaded: false
    };
    this.SocketService = new SocketService();
  }

  componentDidMount() {
    this.SocketService.connect(config.socketUrl);
    this.SocketService.addListener('drone_data', this.updateInputData.bind(this));
    this.SocketService.addListener('connect', () => {
      this.setState({
        isConnected: this.SocketService.connected()
      });
    });
    const loadingTimeout = setTimeout(
      () => {
        this.setState({
          appLoaded: true
        });
        clearTimeout(loadingTimeout);
      },
      4000
    );
  }

  componentWillUnmount() {
    this.SocketService.removeListener('drone_data');
    this.SocketService.close();
    this.setState({
      isConnected: false
    });
  }

  updateInputData(message) {
    if (message && message.latitude && message.longitude) {
      this.setState({
        inputData: this.state.inputData.concat([message])
      });
    }
  }

  render() {
    const app = this.state.appLoaded ?
    <div className="index">
      <NavBarComponent />
      <MapComponent inputData={this.state.inputData}  />
      <DataLoggerComponent inputData={this.state.inputData} />
    </div> : <LoadingComponent />;
    return app;
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
