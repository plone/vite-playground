module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['prettier', 'react-hooks'],
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
    jasmine: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'import/no-unresolved': 1,
    'no-alert': 1,
    'no-console': 1,
    'no-debugger': 1,
    'prettier/prettier': ['error', { trailingComma: 'all', singleQuote: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', './src'],
          ['@root', '../../src'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    'import/core-modules': ['load-volto-addons'],
  },
};
