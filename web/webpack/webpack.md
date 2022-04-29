#  webpack 入门

## 一、 webpack 五个核心概念 

### 1、 Entry 

入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。  

### 2、 Output 

输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名 

### 3、 Loader 

 Loader 让 webpack 能 够 去 处 理 那 些 非 JavaScript 文 件 (webpack 自 身 只 理 解 JavaScript) 

### 4、 Plugins 

插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩， 一直到重新定义环境中的变量等。 

### 5、 Mode 

 模式(Mode)指示 webpack 使用相应模式的配置。 

| 选项        | 描述                                                         |                             |
| ----------- | ------------------------------------------------------------ | --------------------------- |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为development。启用 NamedChunksPlugin 和 NamedModulesPlugin。 | 能让代码本地调试 运行的环   |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。 | 能让代码优化上线 运行的环境 |

## 二、 基本操作

### 1、初始化配置

#### （1） 初始化 package.json

```
npm init
```

#### （2） 下载并安装 webpack 

```
npm install webpack webpack-cli -g
npm install webpack webpack-cli -D
```

### 2、 编译打包应用 

#### （1）作用

- webpack 能够编译打包 js 和 json 文件。 
- 能将 es6 的模块化语法转换成浏览器能识别的语法。
- 能压缩代码。 

#### （2） 问题 

- 不能编译打包 css、img 等文件。 
- 不能将 js 的 es6 基本语法转化为 es5 以下语法。 

#### （3） 运行指令 

```
webpack src/js/index.js -o build/js/built.js --mode=development
webpack src/js/index.js -o build/js/built.js --mode=production
```



## 三、 开发环境的基本配置 

### 1、 创建配置文件 

#### （1） 创建文件 webpack.config.js 

```js
const { resolve } = require('path'); // node 内置核心模块，用来处理路径问题

module.exports = {
  entry: './src/js/index.js', // 入口文件
  output: { // 输出配置
  filename: './built.js', // 输出文件名
  path: resolve(__dirname, 'build/js') // 输出文件路径配置
},
mode: 'development' //开发环境
};
```

#### （2）打包样式文件

- css

  ```
  npm i css-loader style-loader -D
  ```

- sass

  ```
  npm i sass sass-loader -D
  ```

```js
const { resolve } = require('path') // node 内置核心模块，用来处理路径问题

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    // 输出配置
    filename: './built.js', // 输出文件名
    path: resolve(__dirname, 'build/js') // 输出文件路径配置
  },
  // loader 的配置
  module: {
    rules: [
      // 详细 loader 配置
      // 不同文件必须配置不同 loader 处理
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些 loader 进行处理
        use: [
          // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
          // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
          'style-loader',
          // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          // 将 less 文件编译成 css 文件
          // 需要下载 sass-loader 和 sass
          'sass-loader'
        ]
      }
    ]
  },
  // plugins 的配置
  plugins: [
    // 详细 plugins 的配置
  ],
  mode: 'development' //开发环境
}
```

#### （3） 打包 HTML 资源 

-  下载安装 plugin 包 

```
npm install --save-dev html-webpack-plugin
```

- 添加配置文件

```js
plugins: [
  // plugins 的配置
  // html-webpack-plugin
  // 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS）
  // 需求：需要有结构的 HTML 文件
  new HtmlWebpackPlugin({
    // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
    template: './src/index.html'
  })
]
```

#### （4）打包图片资源

- 样式中图片

  ```
  npm install --save-dev html-loader url-loader file-loader
  ```

- html中图片

  ```
  npm i html-loader -D
  ```

```js
module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        // 使用一个 loader
        // 下载 url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于 8kb，就会被 base64 处理
          // 优点: 减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析
          esModule: false,
          // 给图片进行重命名
          // [hash:10]取图片的 hash 的前 10 位
          // [ext]取文件原来扩展名
          name: '[hash:10].[ext]'
      		},
      		type: 'javascript/auto'
      },
      {
        test: /\.html$/,
        // 处理 html 文件的 img 图片（负责引入 img，从而能被 url-loader 进行处理）
        loader: 'html-loader',
        options: {
          esModule: false
        }
      }
    ]
}
```

#### （5）打包其它资源

