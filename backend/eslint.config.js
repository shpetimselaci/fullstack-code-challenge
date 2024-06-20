const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettierConfig = require('eslint-config-prettier');

const { includeIgnoreFile } = require('@eslint/compat');
const path = require('node:path');
const gitignorePath = path.resolve(__dirname, '.gitignore');

console.log('includeIgnoreFile(gitignorePath)', includeIgnoreFile(gitignorePath));
module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: [...includeIgnoreFile(gitignorePath).ignores, 'eslint.config.js'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);
