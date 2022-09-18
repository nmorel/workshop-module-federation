module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'turbo',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': ['error', require('prettier-config-custom')],
  },
  overrides: [
    {
      files: ['*.js', '*.cjs'],
      extends: ['plugin:node/recommended'],
      parserOptions: {
        allowImportExportEverywhere: true,
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      rules: {
        'node/no-unpublished-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
