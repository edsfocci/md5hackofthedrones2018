'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  mapBoxAPIToken: 'pk.eyJ1IjoibWFwaW5lZGEiLCJhIjoiY2loOWgybDhnMHR4eHUwa2xhOHRnYTJ3aiJ9.OLTnRf2Py_IXUBSfG8dbPQ'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
