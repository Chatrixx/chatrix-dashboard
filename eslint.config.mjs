import js from "@eslint/js";
import next from "eslint-plugin-next";
import pluginImport from "eslint-plugin-react";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended, // Base JavaScript best practices
  next, // Next.js specific linting rules
  {
    plugins: {
      import: pluginImport,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
    },
    rules: {
      // ✅ Next.js and React Best Practices
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Next.js includes React automatically
      "react-hooks/rules-of-hooks": "error", // Ensures hooks follow the rules
      "react-hooks/exhaustive-deps": "warn", // Warns if dependencies are missing in useEffect

      // ✅ Imports & Code Quality
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "error", // Prevents unresolved imports

      // ✅ Prevent Common Mistakes
      "no-console": "error", // Blocks console.log in production
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Allows unused vars prefixed with `_`
      "no-undef": "error", // Prevents using undefined variables
      eqeqeq: ["error", "always"], // Enforces === instead of ==
      curly: ["error", "all"], // Requires braces for if/else blocks
      "no-debugger": "error", // Blocks debugger statements
      "no-alert": "error", // Blocks alert(), confirm(), and prompt()
      "no-eval": "error", // Prevents eval() usage
      "no-trailing-spaces": "error", // Disallows unnecessary whitespace at the end of lines

      // ✅ Accessibility (Important for Next.js)
      "jsx-a11y/alt-text": "warn", // Ensures alt text is used for images
      "jsx-a11y/anchor-is-valid": "warn", // Ensures valid <a> usage
    },
    ignores: [
      "node_modules",
      ".next",
      "dist",
      "coverage",
      "**/*.config.js",
      "**/*.config.mjs",
    ],
  },
];
