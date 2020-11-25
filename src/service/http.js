/* eslint-disable no-magic-numbers */

import axios from 'axios';
// import Modal from '~/component/Modal';
// import {Cookie, LocalStorage} from '@haoke/land-util';

const defaultErrorMessage = '网络请求失败, 请稍后重试';

const ERROE_CODE_302 = 302;
const ERROE_CODE_307 = 307;
const ERROE_CODE_401 = 401;
const ERROE_CODE_1003 = 1003;
const ERROE_CODE_1004 = 1004;
const ERROE_CODE_17030 = 17030;
const ERROE_CODE_990000 = 990000;
const ERROE_CODE_888889 = 888889;
const ERROE_CODE_1000111 = 1000111;
const OTHER_CODE_1_5 = 1.5;

const codeMessage = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

let haveAlertModal = false;

class Http {
    constructor() {
        this.instance = axios.create({
            timeout: 10000,
            retry: 0,
            retryDelay: 1000,
            params: {
                ts: +new Date()
            }
        });

        this.customError = false;
        this.init();
    }

    setErrorCustom() {
        this.customError = true;
    }

    init() {
        this.instance.interceptors.request.use(config => {

            // 1. 开发环境不走通用的 mock 平台
            // 2. 作非同源处理，不带 token 等数据
            const {url} = config;
            const ABSOLUTE_URL_REG = /^(https?:)?\/\//i;
            const isUrlAbsolute = ABSOLUTE_URL_REG.test(url);

            config.headers['X-Requested-With'] = 'XMLHttpRequest';

            if (isUrlAbsolute) {
                config.headers = {
                    ...config.headers,
                    'Content-Type': ''
                };
            }
            else {
                config.headers.Accept = '*/*';
            }

            return config;
        });

        this.instance.interceptors.response.use(
            this.success,
            this.fail
        );

        this.instance.axios = axios;
    }

    // 错误提示框
    alertErrorInfo = res => {
        const text = res.status === 0
            ? '请求超时，请稍后重试'
            : (res.msg || defaultErrorMessage) + (res.status ? `(${res.status})` : '');
        const loggerId = res.loggerId || '';


        if (res.status === 400) {
            const errorText = codeMessage[res.status] || res.statusText;
            const {status, url, requestParams} = res;

            if (!this.customError) {

                // Modal.alert({
                //     contentText: `请求错误 ${status}: ${errorText}`,
                //     subText: loggerId ? loggerId.substr(0, 10) : null
                // })
            }

            return;
        }

        if (res.status !== 0) {
            if (!this.customError) {
                // Modal.alert({
                //     contentText: text,
                //     subText: loggerId ? loggerId.substr(0, 10) : null
                // })
            }
        }
    };

    getInstance() {
        return this.instance;
    }

    // 接口200
    handler = res => {
        const self = this;

        // 302直接跳转
        if (res.code === ERROE_CODE_302) {
            window.location.href = res.redirect_url;
            return;
        }

        // 未登陆 或者 登录失效
        if (res.code === ERROE_CODE_401 || res.code === ERROE_CODE_1004) {
            if (haveAlertModal) {
                return;
            }
            haveAlertModal = true;

        }

        // code为888889是竞品老师评价的时候的错误码
        // code为1000111发送验证码时，需要出图形验证码的错误码
        // code为110056发送验证码时，图形验证码无效
        // code为17030发送验证码时，需要图形验证码
        if (
            res.code !== 0
            && res.code !== ERROE_CODE_1004
            && res.code !== ERROE_CODE_1000111
            && res.code !== ERROE_CODE_17030
            && (res.code !== ERROE_CODE_990000 && res.code !== ERROE_CODE_888889)
        ) {
            this.alertErrorInfo(res);
        }
    };

    // 接口错误处理
    failHandle = res => {
        const {config, request} = res;

        let response;
        try {
            response = JSON.parse(request.response);
        }
        catch {
            response = null;
        }

        if (config) {
            const {url, params} = config;
            response = {...response, url, requestParams: params};
        }

        if (request && response) {
            response = {...response, status: request.status};
            this.alertErrorInfo(Object.assign(response, {
                status: request.status
            }));
        }
        else {
            this.alertErrorInfo(request);
        }
    };

    success = ({data, config}) => {
        // 需要统一返回的 JSON 格式
        // 然后可以识别到响应异常，作统一处理，比如弹窗
        // 比如增加同样的 request 拦截，显示 loading 状态
        // 然后在 response 里隐藏 loading 状态
        // 返回数据
        const {headers} = config;
        return new Promise((resolve, reject) => {
            if (data.code === 0) {
                resolve(data);
            }
            else {
                this.handler(Object.assign(data, {
                    loggerId: headers['Logger-Id']
                }));
                reject(data);
            }
        });
    };

    fail = res => {
        const {config, request, response} = res;

        if (!config) {
            return;
        }

        if (!config || !config.retry) {
            return new Promise((resolve, reject) => {
                this.failHandle(res);
                reject(request);
            });
        }
        config.retryCount = (config.retryCount | 0) + 1;

        if (config.retryCount > config.retry) {
            return new Promise((resolve, reject) => {
                this.failHandle(res);
                reject(request);
            });
        }

        // 超时重复请求
        if (response && response.status && `${response.status}`.indexOf(5) > -1) {
            return new Promise(
                resolve => setTimeout(resolve, config.retryDelay)
            ).then(() => this.instance.request(config));
        }

        return new Promise((_resolve, reject) => {
            this.failHandle(res);
            reject(request);
        });
    };
}

const instance = new Http().getInstance();

// XXX 暂时暴露一个set方法用来设置
// 定制型要求不高，咱们没有必要暴露类
const customInstance = new Http();
customInstance.setErrorCustom('custom');

export const customHttp = customInstance.getInstance();

export default instance;

