import js from "@eslint/js";
import globals from "globals";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
