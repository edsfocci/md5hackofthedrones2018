'use strict';

import React from 'react';
import { head } from 'lodash';
import {geolocated} from 'react-geolocated';
import config from 'config';
import { COLOR_RANGE, LIGHT_SETTINGS, INITIAL_VIEW_STATE, GRID_BOUNDS, TIME, HEXAGON_CONFIG } from '../constants';

import {StaticMap} from 'react-map-gl';
import DeckGL, {HexagonLayer} from 'deck.gl';

import '../styles/Map.css';

class MapComponent extends React.Component {

  constructor(props) {
    super(props);

    // const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;

    // const useGeolocation = isGeolocationAvailable && isGeolocationEnabled && coords;

    this.state = {
      viewState: {
        ...INITIAL_VIEW_STATE,
        latitude: 30.2672,
        longitude: -97.7431
      }
    };
  }

  componentDidMount() {
    // this.updateInterval = setInterval(
    //   () => this.updateLocation(),
    //   TIME.SECONDS.FIVE
    // );
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

  normalize(enteredValue, minEntry, maxEntry, normalizedMin, normalizedMax) {

      const mx = (enteredValue-minEntry)/(maxEntry-minEntry);
      const preshiftNormalized = mx*(normalizedMax-normalizedMin);
      const shiftedNormalized = preshiftNormalized + normalizedMin;

      return shiftedNormalized;

  }

  getColorValue(points) {
    return this.normalize(
      Math.min(points.length * GRID_BOUNDS.scale, GRID_BOUNDS.max),
      GRID_BOUNDS.min,
      GRID_BOUNDS.max,
      GRID_BOUNDS.min,
      GRID_BOUNDS.normalization
    );
  }

  getElevationValue(points) {
    return Math.min(GRID_BOUNDS.max, points.length);
  }

  renderLayers = () => {
    const { sensors, droneData } = this.separateData(this.props.inputData);
    return [
      new HexagonLayer({
        id: 'sensor_mapping',
        colorRange: [head(COLOR_RANGE)],
        data: sensors,
        elevationRange: [0, 1],
        elevationScale: 1,
        ...HEXAGON_CONFIG
      }),
      new HexagonLayer({
        id: 'detection_mapping',
        colorRange: COLOR_RANGE,
        lightSettings: LIGHT_SETTINGS,
        data: droneData,
        elevationDomain: [GRID_BOUNDS.min, GRID_BOUNDS.max],
        colorDomain: [GRID_BOUNDS.min, GRID_BOUNDS.normalization],
        elevationRange: [0, 400],
        elevationScale: 5,
        getColorValue: this.getColorValue.bind(this),
        getElevationValue: this.getElevationValue.bind(this),
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
                  controller={true}
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
