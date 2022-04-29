开发环境

热重启:

watch mode(观察模式)
"watch": "webpack --watch",npm run watch
指示 webpack "watch" 依赖图中所有文件的更改。如果其中一个文件被更新，代码将被重新编译
需要刷新浏览器

使用 webpack-dev-server
npm install --save-dev webpack-dev-server
"start": "webpack serve --open",npm start
webpack-dev-server 为你提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能
webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问
webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 devMiddleware.publicPath 选项进行修改。

使用 webpack-dev-middleware
npm install --save-dev express webpack-dev-middleware
