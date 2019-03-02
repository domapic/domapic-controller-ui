const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = require("./config");

module.exports = env => {
  const environment = env.NODE_ENV;
  const isProduction = environment === "production";
  const configuration = config(environment);

  return {
    entry: ["./src/index.js"],
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
          use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"]
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
    optimization: {
      minimize: true,
      minimizer: isProduction
        ? [
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: false,
              terserOptions: {
                output: {
                  comments: false
                }
              }
            }),
            new OptimizeCSSAssetsPlugin({
              cssProcessorPluginOptions: {
                preset: ["default", { discardComments: { removeAll: true } }]
              }
            })
          ]
        : []
    },
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      port: 3200,
      publicPath: "http://localhost:3000/",
      hot: true,
      historyApiFallback: true
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin(configuration.webpackDefinePlugin),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CopyWebpackPlugin([
        {
          from: "**",
          to: "",
          context: "public/",
          ignore: ["*.html"]
        },
        {
          from: "**",
          to: "semantic/themes",
          context: "node_modules/semantic-ui-css/themes"
        },
        {
          from: "semantic.min.css",
          to: "semantic/semantic.min.css",
          context: "node_modules/semantic-ui-css"
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
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
