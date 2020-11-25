/* eslint-disable no-undef */
export default function vconsole() {
    return new Promise((resolve, reject) => {
        const src = 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js';
        loadScript(src, () => {
            new VConsole();
            resolve('加载成功!');
        });
    });
}

function loadScript(url, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = 'async';
    script.src = url;
    document.body.appendChild(script);
    // IE
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                script.onreadystatechange = null;
                callback();
            }
        };
    }
    else {
        // 非IE
        script.onload = function () {
            callback();
        };
    }
}
