'use strict';

import React from 'react';
import { head } from 'lodash';
import {geolocated} from 'react-geolocated';
import config from 'config';
import { COLOR_RANGE, INITIAL_VIEW_STATE, ELEVATION_SCALE, TIME, HEXAGON_CONFIG } from '../constants';

import {StaticMap} from 'react-map-gl';
import DeckGL, {HexagonLayer} from 'deck.gl';

import '../styles/Map.css';

class MapComponent extends React.Component {

  constructor(props) {
    super(props);

    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;

    const useGeolocation = isGeolocationAvailable && isGeolocationEnabled && coords;

    this.state = {
      elevationScale: ELEVATION_SCALE.max,
      viewState: {
        ...INITIAL_VIEW_STATE,
        latitude: useGeolocation ? coords.latitude : 0,
        longitude: useGeolocation ? coords.longitude : 0
      }
    };
  }

  componentDidMount() {
    this.updateInterval = setInterval(
      () => this.updateLocation(),
      TIME.SECONDS.FIVE
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  updateLocation() {
    const coords = this.getCoords();
    if (coords.latitude && coords.longitude) {
      this.setState({
        viewState: {
          ...this.state.viewState,
          ...coords
        }
      });
    }
  }

  separateData(inputData) {
    const sensors = [];
    const droneData = [];
    const now = new Date().getTime();
    for (let i = 0; i < inputData.length; i++) {
      const coords = [inputData[i].longitude, inputData[i].latitude];
      if (inputData[i].isDrone) {
        if (now - inputData[i].ttl <= TIME.SECONDS.TWENTY) {
          droneData.push(coords);
        }
      }
      if (now - inputData[i].ttl <= TIME.MINUTES.ONE) {
        sensors.push(coords);
      }
    }

    return { sensors, droneData };
  }

  getElevation(points) {
    return (points.length - 0) / (10 - 0)
  }

  getColorValue(points) {
    return (points.length - 0) / (10 - 0)
  }

  renderLayers = () => {
    const { sensors, droneData } = this.separateData(this.props.inputData);
    return [
      new HexagonLayer({
        id: 'sensor_mapping',
        colorRange: [head(COLOR_RANGE)],
        data: sensors,
        elevationRange: [0, 10],
        elevationScale: 1,
        ...HEXAGON_CONFIG
      }),
      new HexagonLayer({
        id: 'detection_mapping',
        colorRange: COLOR_RANGE,
        data: droneData,
        elevationDomain: [0, 10],
        colorDomain: [0, 1],
        elevationRange: [0, 1000],
        elevationScale: 2,
        getColorValue: this.getColorValue,
        getElevation: this.getElevation,
        ...HEXAGON_CONFIG
      })
    ];
  }

  getCoords() {
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
    const useGeolocation = isGeolocationAvailable && isGeolocationEnabled && coords;
    const newLatitude = useGeolocation ? coords.latitude : 0;
    const newLongitude = useGeolocation ? coords.longitude : 0;
    const { latitude, longitude } = this.state ? this.state.viewState : {latitude : 0, longitude: 0};

    return newLatitude === latitude && newLongitude === longitude ? {} : { latitude: newLatitude, longitude: newLongitude }
  }

  render() {
    const { inputData } = this.props;
    return (
      <div className="map-component">
        {
          inputData ?
          (
            <div>
              <div className="map-container">
                <DeckGL
                  layers={this.renderLayers()}
                  width="100%"
                  height={500}
                  initialViewState={INITIAL_VIEW_STATE}
                  viewState={this.state.viewState}
                >
                  <StaticMap
                      reuseMaps
                      mapStyle="mapbox://styles/mapbox/dark-v9"
                      preventStyleDiffing={true}
                      mapboxApiAccessToken={config.mapBoxAPIToken}
                    />
                </DeckGL>
              </div>
              {/* {
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
                        <div>Longitude {coords.longitude}</div>
                      </div>
                    ) : <div>Fetching location...</div>
                  )
                )
              } */}
            </div>
          ) : <div>Fetching Data</div>
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
