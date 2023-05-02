import path from "path";
import webpack, { DefinePlugin, RuleSetRule } from "webpack";
import { BuildPath } from "../build/types/config";
import { buildSvgLoader } from "../build/loaders/buildSvgLoader";
import { buildCssLoader } from "../build/loaders/buildCssLoaders";

export default {
    stories: ["../../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        {
            name: "@storybook/addon-essentials",
            options: {
                backgrounds: false,
            },
        },
        "@storybook/addon-interactions",
        "storybook-addon-mock",
        "storybook-addon-themes",
    ],
    framework: "@storybook/react-webpack5",
    core: {
        builder: "@storybook/builder-webpack5",
    },
    webpackFinal: async (config: webpack.Configuration) => {
        const paths: BuildPath = {
            build: "",
            html: "",
            entry: "",
            src: path.resolve(__dirname, "..", "..", "src"),
            locales: "",
            buildLocales: "",
        };

        config!.resolve!.alias = {
            ...config!.resolve!.alias,
            "@": paths.src,
        };

        config.resolve!.modules!.push(paths.src);
        config.resolve!.extensions!.push(".ts", ".tsx");

        const rules = config.module!.rules as RuleSetRule[];
        config.module!.rules = rules.map((rule) => {
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i };
            }
            return rule;
        });

        config.module!.rules!.push(buildSvgLoader());
        config.module!.rules!.push(buildCssLoader(true));
        config.plugins!.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify("https://testapi.com"),
                __PROJECT__: JSON.stringify("storybook"),
            })
        );
        config.performance = {
            hints: false,
        };
        return config;
    },
};
