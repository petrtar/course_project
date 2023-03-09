import webpack from "webpack";
import { buildBabelLoaders } from "./loaders/buildBabelLoaders";
import { buildCssLoader } from "./loaders/buildCssLoaders";
import { buildSvgLoader } from "./loaders/buildSvgLoader";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;
  const svgLoader = buildSvgLoader();

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff|ttf)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  const babelLoader = buildBabelLoaders(options);

  const cssLoader = buildCssLoader(isDev);

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
