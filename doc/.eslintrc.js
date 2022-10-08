module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': [
      'error',
      {
        allowModules: ['@theme', '@docusaurus', '@site'],
      },
    ],
  },
}
