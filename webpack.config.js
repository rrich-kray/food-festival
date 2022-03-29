const path = require("path");
const webpack = require("webpack"); // this is to ensure we bring webpacks properties and methods to the config file.
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // this gives the webpack access to the plugin

module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  }, // the entry point is the root of the bundle and the beginning of the dependency graph. Webpack will take this entry point, bundle the code, and output it in a a folder we specify
  output: {
    filename: "[name].bundle.js", // the name of each attribute in the config.entry object above will be used in place of [name] in each bundle.js file that is created
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
            // You should save this optimization for for the production version because this improvement will lead to increased build times during development
            // It is questionable to implement such a complex build process just to optimize a couple of image files, but the real benefits come when you work on a project with many image files that need to be optimized
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      JQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // report outputs to to an html file in the dist folder
    }),
  ],
  mode: "development",
};

// Modularize your JavaScript code into separate files, then create an entry point for each file. The config.output will output each config.entry item. Then reference these in your HTMl files.
