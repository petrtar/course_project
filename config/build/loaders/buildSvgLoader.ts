export function buildSvgLoader() {
  return {
    test: /\.svg$/i,
    use: ["@svgr/webpack"],
  };
}
