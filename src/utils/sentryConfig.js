/* eslint-disable max-len */
export default function sentryConfig() {
    if (window.Sentry) {
        // eslint-disable-next-line no-undef
        Sentry.init({
            dsn: 'https://49fa03f1911b46f1b68b16421ec2ccab@sentry.baijiahulian.com/616',
            release: 'v@1.0.0',
            beforeSend(event) {
                // 错误信息
                if (
                    !event
                    || !event.exception
                    || !event.exception.values[0]
                    || typeof (event.exception.values[0].value) !== 'string'
                ) {
                    return;
                }
                const {value} = event.exception.values[0];

                // 存储需要过滤的信息
                const errorList = [
                    'Can\'t find variable: Jockey',
                    'Jockey is not defined',
                    'Can\'t find variable: tad_get_back_gesture_enabled',
                    'Maximum call stack size exceeded',
                    'Cannot read property \'stopPropagation\' of undefined',
                    'Cannot read property \'province\' of undefined',
                    'Cannot read property \'endWidth\' of undefined',
                    'Cannot read property \'trigger\' of undefined',
                    'captureMessage(asset/raven)',
                    'Object [object Array] has no method \'find\'',
                    'require is not defined',
                    'undefined is not an object (evaluating \'a.el.trigger\')',
                    'Unexpected token \'(\'. Expected a \':\' following the property name \'path\'.',
                    'null is not an object (evaluating \'c.mobile\')',
                    'null is not an object (evaluating \'document.querySelector',
                    'Invalid or unexpected token',
                    'Invalid character \'\u0027\'',
                    'window._setbackXML_ is not a function. (In \'window._setbackXML_()\', \'window._setbackXML_\' is undefined)',
                    'Cannot read property "webkitFullscreenElement" of null',
                    '"code":',
                    'WeixinJSBridge is not defined',
                    'Cannot set property "innerHTML" of null',
                    'Can\'t find variable: MyAppGetLinkSRCAtPoint',
                    'Can\'t find variable: MyAppGetLinkTitleNameAtPoint',
                    'Can\'t find variable: MyAppGetLinkHREFAtPoint',
                    'start_ is not defined',
                    'Cannot read property "postMessage" of null',
                    'Failed to read the "contentDocument" property from "HTMLIFrameElement"',
                    'Unexpected identifier "u$IIfRXh"',
                    '[NECaptcha] config: "element #captcha-box" not found',
                    'initNECaptcha is not defined',
                    'Can\'t find variable: initNECaptcha',
                    'window.jsi.javaTest is not a function',
                    'tbs_bridge.callbackFromNative is not a function',
                    'Can\'t find variable: isInterceptColseEvent',
                    'vivoNewsDetailPage.getNewsReadStatus4Vivo is not a function',
                    'The quota has been exceeded.',
                    'x5onSkinSwitch is not defined'
                ];

                // 匹配错误信息
                let isMatch;
                for (let i = 0; i < errorList.length; i++) {
                    // 匹配成功
                    if (value.indexOf(errorList[i]) >= 0) {
                        isMatch = true;
                        break;
                    }

                }

                // 如果错误信息已知，直接忽略
                if (isMatch) {
                    return null;
                }

                return event;
            }
        });
    }
}
