const path = require('path');

function resolve(dir) {
    console.log('resolve', __dirname, dir);
    return path.join(__dirname, '.', dir);
}
module.exports = function override(config, _env) {
    config.resolve.alias = {
        '~': resolve('src'),
        'css': resolve('src/css'),
        'util': resolve('src/util'),
    };
    return config;
};
