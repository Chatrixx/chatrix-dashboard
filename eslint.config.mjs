import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "no-console": "warn", // Warn when using console.log
      "no-unused-vars": [
        "warn",
        { args: "after-used", varsIgnorePattern: "^_" },
      ], // Warn for unused variables (except _ prefixed ones)
      "no-undef": "error", // Prevent usage of undefined variables
      "unused-imports/no-unused-imports": "warn", // Warn for unused imports
      "unused-imports/no-unused-vars": [
        "warn",
        { args: "after-used", varsIgnorePattern: "^_" },
      ],
    },
  }),
];

export default eslintConfig;
