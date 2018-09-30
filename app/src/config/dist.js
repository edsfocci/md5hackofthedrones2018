'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  mapBoxAPIToken: 'pk.eyJ1IjoibWlsZXMxNjE4IiwiYSI6ImNqbThibWduMTRxbzczd29ncXhrc2FncHkifQ.46ljV7JH30Uv7Tp-XbczTw',
  socketUrl: 'localhost:3000'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
