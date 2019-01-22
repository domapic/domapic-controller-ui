const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("./config");

module.exports = env => {
  const environment = env.NODE_ENV;
  const configuration = config(environment);

  return {
    entry: ["@babel/polyfill", "./src/index.js"],
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
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          include: /node_modules/,
          use: {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
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
      hot: true,
      historyApiFallback: true
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
