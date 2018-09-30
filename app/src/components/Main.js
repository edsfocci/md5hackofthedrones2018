import React from 'react';
import 'normalize.css/normalize.css';
import '../styles/App.css';
import MapComponent from './MapComponent';
import DataLoggerComponent from './DataLoggerComponent';
import LoadingComponent from './LoadingComponent';

import { mockData } from '../mock-data';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      inputData: [],
      currentIndex: 0
    };
  }

  componentDidMount() {
    this.mockStream = setInterval(
      () => this.mockMessage(),
      50
    );
  }

  componentWillUnmount() {
    clearInterval(this.mockStream);
  }

  mockMessage() {
    let currentIndex = this.state.currentIndex + 1;
    if (currentIndex === mockData.length) {
      clearInterval(this.mockStream);
    } else {
      const message = mockData[currentIndex];
      message.ttl = new Date().getTime();
      this.setState({
        inputData: this.state.inputData.concat([message]),
        currentIndex
      });
    }
  }
  render() {
    const app = this.state.inputData && this.state.inputData.length > 50 ?
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
