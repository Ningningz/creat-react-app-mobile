module.exports = {
    extends: ['plugin:mew/react'],
    globals: {
        habo: true,
        Sentry: true
    },
    env: {
        browser: true,
        node: true,
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
        'template-curly-spacing': ['off'],
        'no-import-assign': ['off'],
        'no-dupe-else-if': ['off'],
        'no-setter-return': ['off']
    }
};
