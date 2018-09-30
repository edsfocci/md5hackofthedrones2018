export const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

export const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 0,
  zoom: 13.5,
  minZoom: 5,
  maxZoom: 15,
  pitch: 37,
  bearing: -30.396674584323023
};

export const HEXAGON_CONFIG = {
  coverage: 1,
  extruded: true,
  getPosition: d => d,
  opacity: 1,
  radius: 25,
  upperPercentile: 100
}

export const ELEVATION_SCALE = {min: 1, max: 2};

export const TIME = {
  SECONDS: {
    FIVE: 5000,
    TEN: 10000
  },
  MINUTES: {
    ONE: 1000 * 60
  }
};
