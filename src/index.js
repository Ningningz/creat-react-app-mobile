import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import 'lib-flexible';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import vConsole from '~/utils/v-console';
import sentryConfig from '~/utils/sentryConfig';
import App from './App';
import './index.less';

// 设置项目标识名
habo.setConfig({
    NAME: 'tiku2'
});


const render = Component => {
    ReactDOM.render(
        <Router>
            <React.StrictMode>
                <Component />
            </React.StrictMode>
        </Router>,
        document.getElementById('root')
    );

    return render;
};
// 保证相关函数在加载完vConsole之后运行
// eslint-disable-next-line no-negated-condition
if (process.env.ENV_TYPE === 'prod') {
    sentryConfig();
    render(App);
}
else {
    vConsole().then(res => {
        render(App);
    });
}
