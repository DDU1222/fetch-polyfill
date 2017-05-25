import webpack from 'webpack';
import path from 'path';
import AssetsWebpackPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { getEntries } from './util';

var distPath = '/catalogue';
// 目录
const rootDir = path.resolve(__dirname);
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist' + distPath);


module.exports = {
  //页面入口文件配置
  entry: getEntries('js', false),
  output: {
    path: distDir,
    publicPath: distPath,
    filename: '[name]_[hash:5].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["es3ify-loader", "babel?compact=false"],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!autoprefixer!sass")
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url"
      },
      {
        test: /\.(ttf|eot|svg|woff)$/,
        loader: "url-loader"
      }, 
      {
        test: /\.dot$/,
        loader: "html?minimize=false"
      }
    ]
  },
  resolve: {
    root: [
      path.join(srcDir, 'js'),
      path.join(srcDir, 'styles'),
      path.join(srcDir, 'template'),
      path.join(rootDir, 'node_modules')
    ],
    extensions: ['.js', '.scss', '.dot', '']
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new ExtractTextPlugin("[name]_[hash:5].css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new AssetsWebpackPlugin({
      filename: 'webpack-assets.json'
    })
  ]
};