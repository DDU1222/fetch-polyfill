import webpack from 'webpack';
import path from 'path';
import { getEntries } from './util';

const distPath = '/catalogue';
// 目录
const rootDir = path.resolve(__dirname);
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist' + distPath);

module.exports = {
  //页面入口文件配置
  entry: getEntries('js', true),
  output: {
    path: distDir,
    publicPath: distPath,
    filename: '[name].js'
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
        loader: "style-loader?sourceMap!css-loader?sourceMap!sass?sourceMap"
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
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/styles")],
    outputStyle: 'nested' //nested, expanded, compact, compressed
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};