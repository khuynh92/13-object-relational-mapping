'use strict';

import pizza from '../src/models/pizza.js';

export default (dir) => {
  const notMongo = {
    find: () => Promise.resolve([]),
    findById: () => Promise.resolve({}),
    save: data => {
      console.log('hiho');
      Promise.resolve(data);
    },
    findByIdAndDelete: () => Promise.resolve({}),
    findByIdAndUpdate: () => Promise.resolve({}),
  };

  if (typeof dir !== 'string') {return {};}
  return {
    'foo': {default: notMongo},
    'pizza': {default: pizza},
  };
};