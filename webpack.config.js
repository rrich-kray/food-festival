const path = require("path");
const webpack = require("webpack"); // this is to ensure we bring webpacks properties and methods to the config file.

module.exports = {
  entry: "./assets/js/script.js", // the entry point is the root of the bundle and the beginning of the dependency graph. Webpack will take this entry point, bundle the code, and output it in a a folder we specify
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      JQuery: "jquery",
    }),
  ],
  mode: "development",
};
