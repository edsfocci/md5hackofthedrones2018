'use strict';

import React from 'react';
import '../styles/Map.css';
import ReactMapGL from 'react-map-gl';
import {geolocated} from 'react-geolocated';
import config from 'config';

class MapComponent extends React.Component {

  constructor(props) {
    super(props);

    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;

    const useGeolocation = isGeolocationAvailable && isGeolocationEnabled && coords;

    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: useGeolocation ? coords.latitude : 0,
        longitude: useGeolocation ? coords.longitude : 0,
        zoom: 8
      }
    };
  }

  render() {
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
    return (
      <div className="map-component">
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
          mapboxApiAccessToken={config.mapBoxAPIToken}
        />
        {
          !isGeolocationAvailable ?
          <div>Your browser does not support Geolocation</div> :
          (
            !isGeolocationEnabled ?
            <div>Geolocation is not enabled</div> :
            (
              coords ?
              (
                <div>
                  <div>Latitude {coords.latitude}</div>
                  <div>Latitude {coords.longitude}</div>
                </div>
              ) : <div>Fetching location...</div>
            )
          )
        }
      </div>
    );
  }
}

MapComponent.displayName = 'MapComponent';

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 10000
})(MapComponent);
