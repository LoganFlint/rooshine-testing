/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    extraFileExtensions: [".vue"],
  },
  plugins: ["vue", "@typescript-eslint", "promise"],
  ignorePatterns: ["*.config.js", ".eslintrc.js", "vite.config.ts"],
  rules: {
    "no-undef": "off",
    // NOTE: these should be fixed
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "no-useless-escape": "warn",
    "@typescript-eslint/require-await": "warn",
    "promise/prefer-await-to-callbacks": "warn",
    // NOTE: buggy with optional chaining
    // ref: https://github.com/typescript-eslint/typescript-eslint/issues/3856
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off"
  },
};
