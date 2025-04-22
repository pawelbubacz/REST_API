const tseslint = require('@typescript-eslint/eslint-plugin');
const globals = require('globals');
const eslintRecommended = require('@eslint/js');

module.exports = {
    'root': true,
    'parser': '@typescript-eslint/parser',
    'plugins': [
      '@typescript-eslint'
    ],
    'rules': {
      'semi': [
        'error',
        'always'
      ],
      'semi-style': [
        'error',
        'last'
      ],
      'no-extra-semi': 'error',
      'no-const-assign': 'error',
      'eqeqeq': 'error',
      'func-style': 'error',
      'require-await': 'error',
      'space-before-blocks': [
        'warn',
        'always'
      ],
      'no-multi-spaces': 'warn',
      'func-call-spacing': [
        'warn',
        'never'
      ],
    'no-template-curly-in-string': 'warn',
      'no-constant-condition': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-imports': 'error',
      'no-dupe-class-members': 'error',
      'no-fallthrough': 'error',
      'no-unreachable': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'curly': 'error',
    'use-isnan': 'warn',
      'no-else-return': [
        'error',
        {
          'allowElseIf': false
        }
      ],
      'prefer-const': 'error',
      'prefer-template': 'warn',
      'block-spacing': 'warn',
      'arrow-spacing': 'warn',
      'comma-dangle': [
        'error',
        'never'
      ],
      'comma-spacing': [
        'warn',
        {
          'before': false,
          'after': true
        }
      ],
      'comma-style': [
        'warn',
        'last'
      ],
      'computed-property-spacing': [
        'warn',
        'never'
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          'max': 1,
          'maxEOF': 0
        }
      ],
      'no-trailing-spaces': 'warn',
      'quotes': [
        'warn',
        'single',
        {
          'avoidEscape': true
        }
      ],
      'no-var': 'warn'
    }
  };