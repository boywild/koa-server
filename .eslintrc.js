module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  overrides: [],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src/']]
      }
    }
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {}
}
