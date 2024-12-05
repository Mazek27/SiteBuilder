module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    '@typescript-eslint',
    'react-hooks',
    'simple-import-sort',
    'import',
    'unused-imports',
  ],
  rules: {
    'prettier/prettier': [
      0,
      {
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 100,
        tabWidth: 2,
        arrowParens: 'avoid',
        jsxSingleQuote: false,
        jsxBracketSameLine: true,
      },
    ],
    'id-length': [
      2,
      {
        exceptions: ['i', 'j', 'k', 'x', 'y', '_'],
      },
    ],
    semi: 0,
    eqeqeq: [1, 'always', { null: 'never' }],
    quotes: [1, 'single'],
    curly: [1, 'all'],
    'import/extensions': 0,
    'jsx-quotes': [2, 'prefer-double'],
    'no-undef': 0,
    'no-console': ['error'],
    'no-debugger': ['error'],
    'no-unused-vars': 0,
    'no-mixed-operators': [
      1,
      {
        allowSamePrecedence: true,
      },
    ],
    'eol-last': [2, 'always'],
    'no-confusing-arrow': 0,
    'arrow-parens': [2, 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'arrow-body-style': [2, 'as-needed'],
    'no-extra-parens': 'off',
    'no-param-reassign': 0,
    'prefer-template': 0,
    'prefer-promise-reject-errors': 0,
    'no-script-url': 0,
    'prefer-promise-reject-errors': 0,
    'no-unused-expressions': 1,
    'no-useless-constructor': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,

    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
            '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    'require-await': 'error',

    // TODO: reconsider enabling class-methods-use-this
    'class-methods-use-this': [0],
    // "dot-notation": 0,
    'no-mixed-operators': 0,

    // NOTE: Enable soon
    'import/no-relative-parent-imports': 0,
    'import/no-duplicates': 0,
    'import/order': 0,

    'import/prefer-default-export': 0,
    'import/no-useless-path-segments': 1,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/newline-after-import': 1,
    'import/no-named-as-default-member': 0,
    'import/namespace': 0,
    'import/named': 0,

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react|redux'],
          ['^\\w'],
          ['^@printu\\w'],
          ['^@\\w'],
          ['^\\u0000'],
          ['^app'],
          ['^modules'],
          ['(\\/)utils(\\/)'],
          ['^'],
          ['^\\.\\.'],
          ['^\\.'],
          ['^debug$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports-ts': 'error',
    'unused-imports/no-unused-vars-ts': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/iframe-has-title': 0,
    'jsx-a11y/control-has-associated-label': 0,

    'react/jsx-wrap-multilines': [
      2,
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'ignore',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-indent': 0,
    'react/jsx-boolean-value': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-closing-bracket-location': [
      2,
      { selfClosing: 'props-aligned', nonEmpty: 'after-props' },
    ],
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-curly-spacing': 0,
    'react/no-access-state-in-setstate': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-no-bind': 0,
    'react/require-default-props': 0,
    'react/display-name': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    'react/jsx-closing-bracket-location': [
      1,
      {
        nonEmpty: 'after-props',
        selfClosing: 'line-aligned',
      },
    ],
    'react/sort-comp': 0,
    'react/function-component-definition': [
      0,
      {
        'named-components': ['arrow-function', 'function-expression'],
        'unnamed-components': ['arrow-function', 'function-expression'],
      },
    ],

    'react-hooks/rules-of-hooks': 1,
    'react-hooks/exhaustive-deps': 1,

    // TODO: enable soon
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0,

    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^(_|React)',
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    '@typescript-eslint/no-extra-parens': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/consistent-type-imports': [
      2,
      {
        prefer: 'type-imports',
      },
    ],
  },
};
