/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import path from "path";

export default {
    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,
    testEnvironment: "jsdom",
    coveragePathIgnorePatterns: ["/node_modules/"],
    moduleDirectories: ["node_modules"],

    // An array of file extensions your modules use
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

    modulePaths: ["<rootDir>src"],

    // The root directory that Jest should scan for tests and modules within
    rootDir: "../../",
    setupFilesAfterEnv: ["<rootDir>config/jest/setupTest.ts"],

    // The glob patterns Jest uses to detect test files
    testMatch: ["<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)"],

    moduleNameMapper: {
        "\\.s?css$": "identity-obj-proxy",
        "\\.svg": path.resolve(__dirname, "jestEmptyComponent.tsx"),
    },

    globals: {
        __IS_DEV__: true,
        __API__: "",
        __PROJECT__: "jest",
    },
};
