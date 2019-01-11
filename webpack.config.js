const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("./config");

module.exports = env => {
  const environment = env.NODE_ENV;
  const configuration = config(environment);

  return {
    entry: "./src/index.js",
    mode: environment,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(js|jsx)?$/,
          include: /node_modules/,
          use: ["react-hot-loader/webpack"]
        }
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/dist/",
      filename: "js/main.js"
    },
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      port: 3000,
      publicPath: "http://localhost:3000/",
      hot: true
    },
    plugins: [
      new webpack.DefinePlugin(configuration.webpackDefinePlugin),
      new CopyWebpackPlugin([
        {
          from: "**",
          to: "",
          context: "public/",
          ignore: ["*.html"]
        }
      ]),
      new HtmlWebpackPlugin({
        title: "TEST",
        template: "public/index.html",
        inject: false,
        minify: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeComments: true
        },
        templateParameters: configuration
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
