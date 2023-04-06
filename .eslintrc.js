// Airbnb 에서 정한 룰을 따르거라.
module.exports = {
  extends: ['airbnb-base'],
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'off',
    'nonblock-statement-body-position': 'off',
    'import/no-extraneous-dependencies': 'off',
    curly: 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    es6: true,
  },
};
