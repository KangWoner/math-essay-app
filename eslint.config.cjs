module.exports = {
  languageOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    react: require('eslint-plugin-react'),
  },
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
};
