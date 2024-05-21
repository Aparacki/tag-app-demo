module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:unicorn/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
    "eslint-config-prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    project: ["tsconfig.json"],
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "unicorn",
    "react-refresh",
    "simple-import-sort",
    "unused-imports",
    "prettier",
  ],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    // Basic ESLint rules
    "import/no-duplicates": "error",
    "import/no-unresolved": "off", // plugin can't handle aliases
    "no-await-in-loop": "error",
    "no-console": "warn", // Best practice to avoid leaving console.log in your code
    "no-constant-binary-expression": "error",
    "no-new-native-nonconstructor": "error",
    "no-promise-executor-return": "error",
    "no-return-await": "error",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreachable-loop": "error",
    "no-unused-private-class-members": "error",
    "no-use-before-define": "off",
    "no-var": "error", // Disallow var declarations, prefer let or const
    "require-atomic-updates": "error",
    camelcase: "error",
    curly: ["error", "multi"],
    eqeqeq: "error", // Requires the use of === and !==

    // @typescript-eslint rules
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": ["error", { default: "array", readonly: "array" }],
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-useless-empty-export": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-misused-promises": "off",

    // Unicorn rules
    "unicorn/custom-error-definition": "error",
    "unicorn/empty-brace-spaces": "error",
    "unicorn/no-array-for-each": "error",
    "unicorn/no-array-reduce": "error",
    "unicorn/no-console-spaces": "error",
    "unicorn/no-null": "off",
    "unicorn/consistent-function-scoping": "warn",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
          camelCase: true,
        },
      },
    ],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          db: false,
          arg: false,
          args: false,
          env: false,
          fn: false,
          func: {
            fn: true,
            function: false,
          },
          prop: false,
          props: false,
          ref: false,
          refs: false,
        },
        ignore: ["semVer", "SemVer"],
      },
    ],
    "unicorn/no-abusive-eslint-disable": "off",

    // Import sorting
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    // Additional import rules
    "import/first": "error",
    "import/newline-after-import": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // React rules
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
        multiline: "last",
      },
    ],
  },
}
