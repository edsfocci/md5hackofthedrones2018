import React from 'react';
import 'normalize.css/normalize.css';
import '../styles/App.css';
import MapComponent from './MapComponent';
import DataLoggerComponent from './DataLoggerComponent';
import LoadingComponent from './LoadingComponent';
import { SocketService } from '../services/Socket';

import config from 'config';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      inputData: [],
      isConnected: false
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
    })
  }

  componentWillUnmount() {
    this.SocketService.removeListener('drone_data');
    this.SocketService.close();
    this.setState({
      isConnected: false
    });
  }

  updateInputData(message) {
    this.setState({
      inputData: this.state.inputData.concat([message])
    });
  }

  render() {
    const app = this.state.isConnected || this.state.inputData.length > 50 ?
    <div className="index">
      <MapComponent inputData={this.state.inputData}  />
      <DataLoggerComponent inputData={this.state.inputData} />
    </div> : <LoadingComponent />;
    return app;
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
