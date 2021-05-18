module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    project: "./tsconfig.json"
  },
  root: true,
  extends: ['@react-native-community',"plugin:@typescript-eslint/recommended","plugin:prettier/recommended", "prettier/@typescript-eslint"],
  rules: {'prettier/prettier': ['error', {endOfLine: 'auto'}]},
};
