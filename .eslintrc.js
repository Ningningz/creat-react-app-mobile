module.exports = {
    extends: ['plugin:mew/react'],
    env: {
        browser: true,
        node: true,
        es6: true,
        // es5: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'indent': [
            'error',
            4,
            {
                ignoredNodes: ['TemplateLiteral']
            }
        ],
        'template-curly-spacing': ['off']
    }
};
