const path = require('path');
function resolve(dir) {
    console.log('resolve', __dirname, dir);
    return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
    console.log('111', config);
    config.resolve.alias = {
        '~': resolve('src'),
        'css': resolve('src/css'),
    }
    return config;
}