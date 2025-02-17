import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module"
            },
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                process: "readonly",
                chrome: "readonly",
            }
        },
        plugins: {
            "@typescript-eslint": ts,
            prettier
        },
        rules: {
            ...ts.configs.recommended.rules,
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
            "@typescript-eslint/no-unused-vars": "off",
            "prettier/prettier": "error",
            "@typescript-eslint/no-explicit-any": "off"
        }
    },
    prettierConfig
];
