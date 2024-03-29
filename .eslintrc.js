module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "plugin:i18next/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "i18next",
        "react-hooks",
        "ulbi-tv-plugin",
        "unused-imports",
    ],
    rules: {
        "unused-imports/no-unused-imports": "error",
        "react/jsx-filename-extension": [
            2,
            { extensions: [".js", ".jsx", ".tsx"] },
        ],
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "no-unused-vars": "off",
        "react/require-default-props": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "off",
        "react/function-component-definition": "off",
        "no-shadow": "off",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "off",
        "no-underscore-dangle": "off",
        "react/prop-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/no-unstable-nested-components": "warn",
        "i18next/no-literal-string": [
            "error",
            {
                markupOnly: true,
                ignoreAttribute: ["data-testid", "to", "target", "feature"],
            },
        ],
        "max-len": ["error", { ignoreComments: true, code: 125 }],
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies,
        "no-param-reassign": "off",
        "no-undef": "off",
        "react/no-array-index-key": "off",
        "arrow-body-style": "off",
        "no-restricted-globals": "off",
        "@typescript-eslint/no-namespace": "off",
        "react/jsx-no-useless-fragment": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "func-names": "off",
        "no-restricted-syntax": "off",
        "ulbi-tv-plugin/path-checker": ["error", { alias: "@" }],
        "ulbi-tv-plugin/layer-imports": [
            "error",
            {
                alias: "@",
                ignoreImportPatterns: ["**/StoreProvider", "**/testing"],
            },
        ],
        "ulbi-tv-plugin/public-api-imports": [
            "error",
            {
                alias: "@",
                testFilesPatterns: [
                    "**/*.test.*",
                    "**/*/story.*",
                    "**/StoreDecorator.tsx",
                ],
            },
        ],
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ["**/src/**/*.{test,stories}.{ts,tsx}"],
            rules: {
                "i18next/no-literal-string": "off",
                "max-len": "off",
                "linebreak-style": "off",
            },
        },
    ],
};
