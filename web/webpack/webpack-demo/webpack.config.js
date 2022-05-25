const path = require('path');
// go-back-管理资源
// const toml = require('toml');
// const yaml = require('yamljs');
// const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  // entry: './src/index.js',
  mode: 'development',
  // 入口起点：使用 entry 配置手动地分离代码。
  // 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
  // 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。
  entry: {
    index: './src/index.js',
    // print: './src/print.js',
    // another: './src/another-module.js',
    // 配置 dependOn option 选项，这样可以在多个 chunk 之间共享模块：
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared',
    // },
    // print: {
    //   import: './src/print.js',
    //   dependOn: 'shared',
    // },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared',
    // },
    // shared: 'lodash',
  },
  // 使用 source map: 为了更容易地追踪 error 和 warning
  // 可以将编译后的代码映射回原始源代码
  devtool: 'inline-source-map',
  // webpack-dev-server 为你提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能
  // 修改配置文件，告知 dev server，从什么位置查找文件
  // npm install --save-dev webpack-dev-server
  devServer: {
    static: './dist',
  },
  plugins: [
    // HtmlWebpackPlugin默认生成新的 index.html 文件，替换我们的原有文件
    // 动态引入 output 中js
    new HtmlWebpackPlugin({
      // title: '管理输出',
      title: 'Development',
    }),
  ],
  output: {
    // filename: 'main.js',
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 清理 /dist 文件夹
    clean: true,
    // npm install --save-dev express webpack-dev-middleware
    publicPath: '/',
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  // 要在一个 HTML 页面上使用多个入口时，还需设置 optimization.runtimeChunk: 'single'
  // optimization: {
  //   runtimeChunk: 'single',
  // },
  // go-back-管理资源
  // module: {
  //   rules: [
  //     // 加载 CSS
  //     // npm install --save-dev style-loader css-loader
  //     {
  //       test: /\.css$/i,
  //       use: ['style-loader', 'css-loader'],
  //     },
  //     // 加载 images( background 和 icon ) 图像 内置的 Asset Modules
  //     {
  //       test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //       type: 'asset/resource',
  //     },
  //     // 加载 fonts 字体 
  //     // Asset Modules 可以接收并加载任何文件，然后将其输出到构建目录。
  //     // 可以将它们用于任何类型的文件，也包括字体
  //     {
  //       test: /\.(woff|woff2|eot|ttf|otf)$/i,
  //       type: 'asset/resource',
  //     },
  //     // 加载数据 npm install --save-dev csv-loader xml-loader
  //     // JSON支持是内置的 import Data from './data.json' 默认将正常运行
  //     {
  //       test: /\.(csv|tsv)$/i,
  //       use: ['csv-loader'],
  //     },
  //     {
  //       test: /\.xml$/i,
  //       use: ['xml-loader'],
  //     },
  //     // 自定义 JSON 模块 parser
  //     // 通过使用 自定义 parser 替代特定的 webpack loader，可以将任何 toml、yaml 或 json5 文件作为 JSON 模块导入。
  //     // npm install toml yamljs json5 --save-dev
  //     {
  //       test: /\.toml$/i,
  //       type: 'json',
  //       parser: {
  //         parse: toml.parse,
  //       },
  //     },
  //     {
  //       test: /\.yaml$/i,
  //       type: 'json',
  //       parser: {
  //         parse: yaml.parse,
  //       },
  //     },
  //     {
  //       test: /\.json5$/i,
  //       type: 'json',
  //       parser: {
  //         parse: json5.parse,
  //       },
  //     },
  //   ],
  // },
};