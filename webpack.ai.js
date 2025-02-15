const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  mode: "none", // No optimizations, just copying and zipping
  entry: {}, // No actual entry points since we're just copying files
  output: {
    path: path.resolve(__dirname, "output/tmp"), // Temporary directory for copied files
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "output/tmp")],
      cleanAfterEveryBuildPatterns: [path.resolve(__dirname, "output/tmp")],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname),
          to: path.resolve(__dirname, "output/tmp"),
          globOptions: {
            ignore: [
              "**/node_modules/**",
              "**/output/**",
              "**/.git/**",
              "**/.idea/**"
            ],
          },
        },
      ],
    }),

    new ZipPlugin({
      filename: "ai-analysis-export-minimalist-focus-mode.zip",
      path: path.resolve(__dirname, "output"),
      pathPrefix: "./",
    }),
  ],
};
