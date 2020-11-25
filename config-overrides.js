const path = require('path');
const {
    override,
    disableEsLint,
    overrideDevServer,
    addPostcssPlugins,
    addWebpackAlias,
    addLessLoader
} = require("customize-cra");
const rewirePostcss = require('react-app-rewire-postcss');
const proxyConfig = require('./proxy.config');

function resolve(dir) {
    console.log('resolve', __dirname, dir);
    return path.join(__dirname, '.', dir)
};

const customAddRem = (config, paths) => {
    // 重写postcss
    rewirePostcss(config, {
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            }),
        ],
    });
    return config;
};

function getProxyInfo(mockType, rewrite) {
    const {
        HOST,
        PREFIX
    } = proxyConfig.MOCK_SERVE_MAP[mockType];

    return {
        target: HOST,
        prefix: `${PREFIX}${rewrite}`
    };
}

function genTestRule(test) {
    return test.replace(/\/\//g, '/');
}

/**
 * 获取webpack proxy所需要的配置(读原有配置文件)
 *
 * @param {Array} config proxy.config.js配置文件配置
 * @param {string|Array} config.interfaces 要匹配的接口路径
 * @param {string} config.rewrite rewrite地址
 * @param {string=} config.mockType mock服务类型
 * @return {Object} webpack proxy所需要的配置
 */
function getProxyConfig(config) {
    return config.map(({ interfaces, rewrite, mockType = 'YAPI' }) => {
        let contextArr = [];
        const {
            target,
            prefix
        } = getProxyInfo(mockType, rewrite);

        if (Array.isArray(interfaces)) {
            contextArr = interfaces.map(url => genTestRule(url));
        }
        else {
            // 统一用数组处理吧
            contextArr.push(genTestRule(interfaces));
        }
        return {
            context: contextArr,
            target,
            changeOrigin: true,
            pathRewrite: path => `${prefix}${path}`,
            onProxyReq(proxyReq, req, res) {
                console.log(`${req.originalUrl}接口转发到${proxyReq.connection._host}${req.url}`);
            }
        };
    });
}

const devServerConfig = () => config => {
    return {
        ...config,
        proxy: [...getProxyConfig(proxyConfig.config)]
    };
};

module.exports = {
    webpack: override(
        addWebpackAlias({
            '~': resolve('src'),
            'component': resolve('src/components')
        }),
        addLessLoader({
            lessOptions: {
                cssLoaderOptions: {
                    onlyLocals: true,
                    modules: {
                        localIdentName: "[path][name]__[local]--[hash:base64:5]",
                    },
                },
                lessLoaderOptions: {
                    lessOptions: {
                        strictMath: true,
                        javascriptEnabled: true,
                        noIeCompat: true,
                        compress: true,
                        modules: {
                            localIdentName: "[path][name]__[local]--[hash:base64:5]",
                        },
                    },
                },
            }
        }),
        addPostcssPlugins([
            require("postcss-px2rem")({
                remUnit: 75,
                exclude: /node-modules/
            })
        ]),
        (config) => {
            return customAddRem(config)
        },
    ),
    devServer: overrideDevServer(devServerConfig())
}