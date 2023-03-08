import webpack, { DefinePlugin, RuleSetRule } from "webpack";

import path from "path";

import { buildCssLoader } from "../build/loaders/buildCssLoaders";
import { buildSvgLoader } from "../build/loaders/buildSvgLoader";
import { BuildPath } from "../build/types/config";

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPath = {
    build: "",
    html: "",
    entry: "",
    src: path.resolve(__dirname, "..", "..", "src"),
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
  config.plugins!.push(new DefinePlugin({ __IS_DEV__: JSON.stringify(true), __API__: JSON.stringify(""), __PROJECT__: JSON.stringify("storybook") }));

  return config;
};
