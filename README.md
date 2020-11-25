[TOC]

## 依赖

- 包管理工具推荐使用  **yarn**
- node版本  **^10.12.0**

## 运行

`yarn start` or `npm start`

Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

## 项目结构

```
    ├── README.md
    ├── build               -------- build后生成的文件
    │   ├── favicon.ico
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── config-overrides.js  ------- webpack的扩展文件
    ├── package.json
    ├── proxy.config.js      ------- 请求代理文件
    ├── public               ------- 静态资源文件夹
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── src                  -------- 业务逻辑代码
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── Routes.js
    │   ├── common              ------ 业务公共组件文件夹
    │   ├── css                 ------ css 样式文件夹
    │   ├── index.js
    │   ├── index.less
    │   ├── logo.svg
    │   ├── pages               ------ 业务页面文件夹
    │   │   ├── Test1.js
    │   │   ├── Test2.js
    │   │   └── TestChildren1.js
    │   ├── route.config.js      ------ 路由配置文件
    │   ├── service              ------ 请求文件夹
    │   │   ├── http.js             ------  封装后请求文件
    │   │   └── use.js
    │   ├── setupTests.js
    │   ├── uiComponent          ------- 基础组件文件夹
    │   └── utils                ------- 工具类方法文件夹
    │       ├── sentryConfig.js       ----- sentry配置文件
    │       └── v-console.js          -----  调试工具文件
    └── yarn.lock
```

## 参考文档

1. [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
2. [React documentation](https://reactjs.org/).
3. [react-app-rewired](https://github.com/marcopeg/create-react-app/blob/master/packages/react-scripts/README.md)
4. [customize-cra](https://github.com/arackaf/customize-cra)
