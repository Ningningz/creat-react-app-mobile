/* config-overrides.js */

// module.exports = function override(config, env) {
//     //do stuff with the webpack config...

//     console.log('over0--------', config);
//     return config;
//   }

const path = require('path');
function resolve(dir) {
    console.log('resolve', __dirname, dir);
    return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
    config.resolve.alias = {
        '~': resolve('src'),
        'css': resolve('src/css'),
        'util': resolve('src/util'),
    }
    return config;
}