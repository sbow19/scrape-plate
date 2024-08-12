const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/app/index.tsx",
    mode: "development",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../public/build"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    resolve: {
      modules: [__dirname, "src", "node_modules"],
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: /node_modules/,
          use: ["file-loader"]
        }, 
      ],
    },
  };