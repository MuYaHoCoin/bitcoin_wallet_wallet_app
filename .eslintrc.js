module.exports = {
  parser: 'babel-eslint',
  plugins:['babel'],
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {'prettier/prettier': ['error', {endOfLine: 'auto'}]},
};
