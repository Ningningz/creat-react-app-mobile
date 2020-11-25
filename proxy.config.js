/**
 * @file 代理配置
 */

const MOCK_SERVE_MAP = {
    YAPI: {
        HOST: 'http://api.baijiahulian.com',
        PREFIX: '/mock/'
    },
    TEST: {
        HOST: 'https://test-api.gaotu100.com',
        PREFIX: ''
    },
};

const DEFAULT_CONFIG = {
    interfaces: [
        '/wallet/',
        '/tapi/',
    ],
    mockType: 'YAPI',
    rewrite: '2296'
};

// TODO: 需要规整所有异步请求的prefix规则，譬如固定以/v1/开头或者固定以/sapi/开头
// mock 平台的项目: 前后顺序有关系
// 下面配置中 baseURL 中 XXX_PREFIX 后紧跟的就是 projectId
// 注意：填写绝对路径
const config = [
    {
        // 跟谁学 business，interfaces 是正在从 mock 迁到 YApi 的零散接口
        interfaces: [
            '/wallet/authRealInfo',
            '/wallet/checkMoney',
        ],
        mockType: 'TEST',
        rewrite: ''
    },
    {
        ...DEFAULT_CONFIG
    }
];

module.exports = {
    config,
    MOCK_SERVE_MAP,
    DEFAULT_CONFIG
};
