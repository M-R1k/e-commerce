const path = require('path');

module.exports = {
    resolve: {
      alias: {
        'react-refresh/runtime': path.resolve(__dirname, 'node_modules/react-refresh/runtime.js'),
    },
  },
};