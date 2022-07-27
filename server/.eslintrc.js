module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
      },
    ],
    "no-redeclare": ["error", { builtinGlobals: false }],
    "import/no-unresolved": "error",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"],
      },
    },
  },
};
