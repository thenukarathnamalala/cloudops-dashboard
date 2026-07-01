import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.ts"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": "off",
    },
  },
];
