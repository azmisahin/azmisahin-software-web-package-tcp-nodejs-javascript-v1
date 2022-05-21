/**
 * Static code analysis definitions to identify
 * problematic patterns in JavaScript code.
 */
module.exports = {
  /**
   * Defines predefined global variables.
   * @see https://eslint.org/docs/user-guide/configuring#specifying-environments
   */
  env: {
    /// Browser global variables.
    browser: true,

    /// Enable all ECMAScript 6 features except modules.
    es6: true,

    /// Node.js global variables and Node.js scope.
    node: true,

    /// Test and cover
    jest: true,
  },

  /**
   * It can close every rule and only work with basic syntax validation.
   *
   * @see https://eslint.org/docs/user-guide/configuring#using-eslintrecommended
   */
  extends: 'eslint:recommended',

  /**
   * Choosing parser options.
   *
   * @see https://eslint.org/docs/user-guide/configuring#specifying-parser-options
   */
  parserOptions: {
    /**
     * Ecma Script version
     */
    ecmaVersion: 'latest',
  },

  /**
   * It is grouped by category to help you understand their purpose.
   *
   * @see https://eslint.org/docs/rules
   */
  rules: {
    /**
     * Apply consistent indentation (indentation).
     *
     * @see https://eslint.org/docs/rules/indent
     */
    indent: ['error', 2],

    /**
     * Apply consistent linebreak style (linebreak style).
     * Cross-platform role
     *
     * @see https://eslint.org/docs/rules/linebreak-style
     */
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],

    /**
     * Require consistent use of reverse quotes, double or single quotes (quotes).
     *
     * @see https://eslint.org/docs/rules/quotes
     */
    quotes: ['error', 'single'],

    /**
     * Requires or without semicolons.
     *
     * @see https://eslint.org/docs/rules/semi
     */
    semi: ['error', 'never'],

    /**
     * Do not allow use console (no console).
     *
     * @see https://eslint.org/docs/rules/no-console
     */
    'no-console': 'error',

    /**
     * Require or allow an empty line after variable declarations
     *
     * @see https://eslint.org/docs/rules/newline-after-var
     */
    'newline-after-var': ['error', 'always'],
  },
}
