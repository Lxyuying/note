# node.js入门

## 一、fs 文件系统模块

### 1.fs.readFile()

> 读取`指定文件中的内容`

```js
const fs = require('fs')

fs.readFile('./files/11.txt', 'utf8', function(err, dataStr) {
  // 如果读取成功，则 err 的值为 null
  // 如果读取失败，则 err 的值为 错误对象，dataStr 的值为 undefined
  if (err) {
    return console.log('读取文件失败！' + err.message)
  }
  console.log('读取文件成功！' + dataStr)
})
```

参数解读：

- 参数1：必选参数，字符串，表示文件的路径。
- 参数2：可选参数，表示以什么编码格式来读取文件。
- 参数3：必选参数，文件读取完成后，通过回调函数拿到读取的结果。

### 2.fs.writeFile()   

> 向指定的文件路径中，写入文件内容  

```js
fs.writeFile('./files/3.txt', 'ok123', function(err) {
  // 2.1 如果文件写入成功，则 err 的值等于 null
  // 2.2 如果文件写入失败，则 err 的值等于一个 错误对象

  if (err) {
    return console.log('文件写入失败！' + err.message)
  }
  console.log('文件写入成功！')
})
```

参数解读：

- 参数1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。
- 参数2：必选参数，表示要写入的内容。
- 参数3：可选参数，表示以什么格式写入文件内容，默认值是 utf8。
- 参数4：必选参数，文件写入完成后的回调函数。

### 3.路径动态拼接的问题

> 代码在运行的时候，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径。
>
> 解决方案：在使用 fs 模块操作文件时，直接提供完整的路径，不要提供 ./ 或 ../ 开头的相对路径，从而防止路径动态拼接的问题。

```js
fs.readFile(__dirname + '/files/1.txt', 'utf8', function(err, dataStr) {
  if (err) {
    return console.log('读取文件失败！' + err.message)
  }
  console.log('读取文件成功！' + dataStr)
})

```



## 二、path 路径模块

### 1.path.join()

> ​     把多个路径片段拼接为完整的路径字符串  

```js
fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function(err, dataStr) {
  if (err) {
    return console.log(err.message)
  }
  console.log(dataStr)
})
```

参数解读：

- ...paths <string> 路径片段的序列
- 返回值: <string>

### 2.path.basename()

> 获取路径中的最后一部分，经常通过这个方法获取路径中的文件名  

```js
const path = require('path')

// 定义文件的存放路径
const fpath = '/a/b/c/index.html'

// const fullName = path.basename(fpath)
// console.log(fullName)

const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt)
```

参数解读：

- path <string> 必选参数，表示一个路径的字符串
- ext <string> 可选参数，表示文件扩展名
- 返回: <string> 表示路径中的最后一部分

### 3.path.extname()

> 获取路径中的扩展名部分  

```js
const path = require('path')

// 这是文件的存放路径
const fpath = '/a/b/c/index.html'

const fext = path.extname(fpath)
console.log(fext)
```

参数解读：

- path <string>必选参数，表示一个路径的字符串
- 返回: <string> 返回得到的扩展名字符串

### 4.时钟案例

```js
// 1.1 导入 fs 模块
const fs = require('fs')
// 1.2 导入 path 模块
const path = require('path')

// 1.3 定义正则表达式，分别匹配 <style></style> 和 <script></script> 标签
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// 2.1 调用 fs.readFile() 方法读取文件
fs.readFile(path.join(__dirname, '../素材/index.html'), 'utf8', function(err, dataStr) {
  // 2.2 读取 HTML 文件失败
  if (err) return console.log('读取HTML文件失败！' + err.message)
  // 2.3 读取文件成功后，调用对应的三个方法，分别拆解出 css, js, html 文件
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHTML(dataStr)
})

// 3.1 定义处理 css 样式的方法
function resolveCSS(htmlStr) {
  // 3.2 使用正则提取需要的内容
  const r1 = regStyle.exec(htmlStr)
  // 3.3 将提取出来的样式字符串，进行字符串的 replace 替换操作
  const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
  // 3.4 调用 fs.writeFile() 方法，将提取的样式，写入到 clock 目录中 index.css 的文件里面
  fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, function(err) {
    if (err) return console.log('写入 CSS 样式失败！' + err.message)
    console.log('写入样式文件成功！')
  })
}

// 4.1 定义处理 js 脚本的方法
function resolveJS(htmlStr) {
  // 4.2 通过正则，提取对应的 <script></script> 标签内容
  const r2 = regScript.exec(htmlStr)
  // 4.3 将提取出来的内容，做进一步的处理
  const newJS = r2[0].replace('<script>', '').replace('</script>', '')
  // 4.4 将处理的结果，写入到 clock 目录中的 index.js 文件里面
  fs.writeFile(path.join(__dirname, './clock/index.js'), newJS, function(err) {
    if (err) return console.log('写入 JavaScript 脚本失败！' + err.message)
    console.log('写入 JS 脚本成功！')
  })
}

// 5.1 定义处理 HTML 结构的方法
function resolveHTML(htmlStr) {
  // 5.2 将字符串调用 replace 方法，把内嵌的 style 和 script 标签，替换为外联的 link 和 script 标签
  const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
  // 5.3 写入 index.html 这个文件
  fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function(err) {
    if (err) return console.log('写入 HTML 文件失败！' + err.message)
    console.log('写入 HTML 页面成功！')
  })
}

```



## 三、http模块

### **1.** **创建** **web** **服务器的基本步骤**

```js
// 1. 导入 http 模块
const http = require('http')
// 2. 创建 web 服务器实例
const server = http.createServer()
// 3. 为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', function (req, res) {
  console.log('Someone visit our web server.')
})
// 4. 启动服务器
server.listen(8080, function () {  
  console.log('server running at http://127.0.0.1:8080')
})
```

### 2.**req** **请求对象 与 **res **响应对象**  

```js
const http = require('http')
const server = http.createServer()
// req 是请求对象，包含了与客户端相关的数据和属性
server.on('request', (req, res) => {
  // req.url 是客户端请求的 URL 地址
  const url = req.url
  // req.method 是客户端请求的 method 类型
  const method = req.method
  const str = `Your request url is ${url}, and request method is ${method}`
  console.log(str)
  // 调用 res.end() 方法，向客户端响应一些内容
  res.end(str)
})
server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

```

### 3.**解决**中文乱码问题

```js
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  // 定义一个字符串，包含中文的内容
  const str = `您请求的 URL 地址是 ${req.url}，请求的 method 类型为 ${req.method}`
  // 调用 res.setHeader() 方法，设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // res.end() 将内容响应给客户端
  res.end(str)
})

server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

```

### 4.**根据不同的** **url** **响应不同的** **html** **内容**

```js
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  // 1. 获取请求的 url 地址
  const url = req.url
  // 2. 设置默认的响应内容为 404 Not found
  let content = '<h1>404 Not found!</h1>'
  // 3. 判断用户请求的是否为 / 或 /index.html 首页
  // 4. 判断用户请求的是否为 /about.html 关于页面
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>'
  } else if (url === '/about.html') {
    content = '<h1>关于页面</h1>'
  }
  // 5. 设置 Content-Type 响应头，防止中文乱码
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // 6. 使用 res.end() 把内容响应给客户端
  res.end(content)
})

server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

```

### 5.实现 **clock** **时钟的** **web** **服务器**  

```js
// 1.1 导入 http 模块
const http = require('http')
// 1.2 导入 fs 模块
const fs = require('fs')
// 1.3 导入 path 模块
const path = require('path')

// 2.1 创建 web 服务器
const server = http.createServer()
// 2.2 监听 web 服务器的 request 事件
server.on('request', (req, res) => {
  // 3.1 获取到客户端请求的 URL 地址
  //     /clock/index.html
  //     /clock/index.css
  //     /clock/index.js
  const url = req.url
  // 3.2 把请求的 URL 地址映射为具体文件的存放路径
  // const fpath = path.join(__dirname, url)
  // 5.1 预定义一个空白的文件存放路径
  let fpath = ''
  if (url === '/') {
    fpath = path.join(__dirname, './clock/index.html')
  } else {
    //     /index.html
    //     /index.css
    //     /index.js
    fpath = path.join(__dirname, '/clock', url)
  }

  // 4.1 根据“映射”过来的文件路径读取文件的内容
  fs.readFile(fpath, 'utf8', (err, dataStr) => {
    // 4.2 读取失败，向客户端响应固定的“错误消息”
    if (err) return res.end('404 Not found.')
    // 4.3 读取成功，将读取成功的内容，响应给客户端
    res.end(dataStr)
  })
})
// 2.3 启动服务器
server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

```



## 四、模块化(CommonJS规范)

```js
//内置模块
const fs = require('fs')
//用户自定义模块
const custon = require('./custom.js')
//第三方模块
const moment = require('moment')
```

### 1.module对象

 在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息  

> console.log(module)

```js
Module {
  id: '.',
  path: 'E:\\document\\node.js—资料\\day2\\code',
  exports: {},
  parent: null,
  filename: 'E:\\document\\node.js—资料\\day2\\code\\10.演示module对象.js',
  loaded: false,
  children: [],
  paths: [
    'E:\\document\\node.js—资料\\day2\\code\\node_modules',
    'E:\\document\\node.js—资料\\day2\\node_modules',
    'E:\\document\\node.js—资料\\node_modules',
    'E:\\document\\node_modules',
    'E:\\node_modules'
  ]
}
```

### **2.** **module.exports** **对象**

> 在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。
>
> 外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。

> 使用 require() 方法导入模块时，导入的结果，**永远以** **module.exports** **指向的对象为准**。

### 3.**exports** **对象**

> 默认情况下，exports 和 module.exports 指向同一个对象。最终共享的结果，还是以 module.exports 指向的对象为准。  



## 五、npm

> npm init -y

> npm i

安装多个用空格分隔

> npm uninstall

如果某些包**只在项目开发阶段**会用到，在**项目上线之后不会用到**，则建议把这些包记录到devDependencies 节点中。

与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中。

> npm i 包名 -D
>
> npm install 包名 --save-dev

### 1.**切换** **npm** **的下包镜像源**  

```js
// 查看当前的下包镜像源
npm config get registry
// 将下包的镜像切换为淘宝镜像
npm config set registry=https://registry.npm.taobao.org/
// 检查镜像源是否下载成功
```

### 2.nrm

> 安装 npm i nrm -g

> 查看可用镜像源 nrm ls

> 切换为taobao镜像 nrm use taobao

### 3.i5ting_toc

> i5ting_toc -f sample.md -o

### 4.规范的包结构

一个规范的包，它的组成结构，必须符合以下 3 点要求：

①包必须以单独的目录而存在

②包的顶级目录下要必须包含 package.json 这个包管理配置文件

③package.json 中必须包含 name，version，main 这三个属性，分别代表包的名字、版本号、包的入口。

注意：以上 3 点要求是一个规范的包结构必须遵守的格式，关于更多的约束，可以参考如下网址：

> https://yarnpkg.com/zh-Hans/docs/package-json

### 5.创建自己的包

> ........................

## 六、express

```
npm i express@4.17.1
```

### 1.**创建基本的** **Web** **服务器**  

```js
// 1. 导入 express
const express = require('express')
// 2. 创建 web 服务器
const app = express()
// 3. 启动 web 服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```

### 2.**监听** **GET**/POST **请求**  

```js
// 4. 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
  res.send({ name: 'zs', age: 20, gender: '男' })
})
app.post('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 文本字符串
  res.send('请求成功')
})
app.get('/', (req, res) => {
  // 通过 req.query 可以获取到客户端发送过来的 查询参数
  // 注意：默认情况下，req.query 是一个空对象
  console.log(req.query)
  res.send(req.query)
})
// 注意：这里的 :id 是一个动态的参数
app.get('/user/:ids/:username', (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
  console.log(req.params)
  res.send(req.params)
})
```

### 3. **托管静态资源**  

```js
const express = require('express')
const app = express()

// 在这里，调用 express.static() 方法，快速的对外提供静态资源
// 如果要托管多个静态资源目录，请多次调用 express.static() 函数：
// 挂载路径前缀
app.use('/files', express.static('./files'))
app.use(express.static('./clock'))

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```

### 4. **nodemon**  

​     当代码被修改后，nodemon 会自动帮我们重启项目  

```
npm install -g nodemon
```

```js
nodemon app.js
```



## 七、express路由

在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

Express 中的路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数，格式如下：

### 1.简单路由

```js
const express = require('express')
const app = express()

// 挂载路由
app.get('/', (req, res) => {
  res.send('hello world.')
})
app.post('/', (req, res) => {
  res.send('Post Request.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})

```



### 2.  **模块化**路由 

①创建路由模块对应的 .js 文件

②调用 express.Router() 函数创建路由对象

③向路由对象上挂载具体的路由

④使用 module.exports 向外共享路由对象

⑤使用 app.use() 函数注册路由模块

```js
const express = require('express')
const app = express()

// app.use('/files', express.static('./files'))

// 1. 导入路由模块
const router = require('./03.router')
// 2. 注册路由模块 // 为路由模块添加前缀
app.use('/api', router)

// 注意： app.use() 函数的作用，就是来注册全局中间件

app.listen(80, () => {
  console.log('http://127.0.0.1')
})

```

```js
// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()

// 3. 挂载具体的路由
router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})
router.post('/user/add', (req, res) => {
  res.send('Add new user.')
})

// 4. 向外导出路由对象
module.exports = router
```



## 八、express中间件

中间件（Middleware ），特指业务流程的中间处理环节。

多个中间件之间，**共享同一份** **req** **和** **res**。基于这样的特性，我们可以在上游的中间件中，**统一**为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

### 1.定义最简单的中间件函数

```js
const express = require('express')
const app = express()

// 定义一个最简单的中间件函数
// const mw = function (req, res, next) {
//   console.log('这是最简单的中间件函数')
//   // 把流转关系，转交给下一个中间件或路由
//   next()
// }

// 将 mw 注册为全局生效的中间件
// app.use(mw)

// 这是定义全局中间件的简化形式
app.use((req, res, next) => {
  console.log('这是最简单的中间件函数')
  next()
})

app.get('/', (req, res) => {
  console.log('调用了 / 这个路由')
  res.send('Home page.')
})
app.get('/user', (req, res) => {
  console.log('调用了 /user 这个路由')
  res.send('User page.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

### 2. 定义**多个**全局中间件

可以使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用  

```js
const express = require('express')
const app = express()

// 定义第一个全局中间件
app.use((req, res, next) => {
  console.log('调用了第1个全局中间件')
  next()
})
// 定义第二个全局中间件
app.use((req, res, next) => {
  console.log('调用了第2个全局中间件')
  next()
})

// 定义一个路由
app.get('/user', (req, res) => {
  res.send('User page.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

### 3.**局部生效**的中间件

​     **不使用** app.use() 定义的中间件，叫做局部生效的中间件  

注册一个

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了局部生效的中间件')
  next()
}

// 2. 创建路由
app.get('/', mw1, (req, res) => {
  res.send('Home page.')
})
app.get('/user', (req, res) => {
  res.send('User page.')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})

```

注册多个

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了第一个局部生效的中间件')
  next()
}

const mw2 = (req, res, next) => {
  console.log('调用了第二个局部生效的中间件')
  next()
}

// 2. 创建路由
app.get('/', [mw1, mw2], (req, res) => {
  res.send('Home page.')
})
app.get('/user', (req, res) => {
  res.send('User page.')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})

```

### 4.中间件的**5**个使用注意事项

①一定要在路由之前注册中间件

②客户端发送过来的请求，可以连续调用多个中间件进行处理

③执行完中间件的业务代码之后，不要忘记调用 next() 函数

④为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码

⑤连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象

### 5.中间件的分类

① 应用级别的中间件

​     通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件  

② 路由级别的中间件

​     绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上  

③ 错误级别的中间件

错误级别中间件的**作用**：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

**格式**：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)。

> **注意：**错误级别的中间件，必须注册在所有路由之后！

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 定义路由
app.get('/', (req, res) => {
  // 1.1 人为的制造错误
  throw new Error('服务器内部发生了错误！')
  res.send('Home page.')
})

// 2. 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})

```

④ Express 内置的中间件

自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

① express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）

② express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

③ express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())
// 通过 express.urlencoded() 这个中间件，来解析 表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
  // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('ok')
})

app.post('/book', (req, res) => {
  // 在服务器端，可以通过 req,body 来获取 JSON 格式的表单数据和 url-encoded 格式的数据
  console.log(req.body)
  res.send('ok')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})

```

⑤ 第三方的中间件

非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率。

例如：在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步骤如下：

①运行 npm install body-parser 安装中间件

②使用 require 导入中间件

③调用 app.use() 注册并使用中间件

**注意：**Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 导入解析表单数据的中间件 body-parser
const parser = require('body-parser')
// 2. 使用 app.use() 注册中间件
app.use(parser.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
  // 如果没有配置任何解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('ok')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})

```

### 6.自定义中间件

> ......................



## 九、使用express编写接口

### 1.创建基本的服务器

```js
// 导入 express
const express = require('express')
// 创建服务器实例
const app = express()

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 必须在配置 cors 中间件之前，配置 JSONP 的接口
app.get('/api/jsonp', (req, res) => {
  // TODO: 定义 JSONP 接口具体的实现过程
  // 1. 得到函数的名称
  const funcName = req.query.callback
  // 2. 定义要发送到客户端的数据对象
  const data = { name: 'zs', age: 22 }
  // 3. 拼接出一个函数的调用
  const scriptStr = `${funcName}(${JSON.stringify(data)})`
  // 4. 把拼接的字符串，响应给客户端
  res.send(scriptStr)
})

// 一定要在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题
const cors = require('cors')
app.use(cors())

// 导入路由模块
const router = require('./16.apiRouter')
// 把路由模块，注册到 app 上
app.use('/api', router)

// 启动服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})

```

### 2. **创建** **API** **路由模块**

```js
const express = require('express')
const router = express.Router()

// 在这里挂载对应的路由
router.get('/get', (req, res) => {
  // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  // 调用 res.send() 方法，向客户端响应处理的结果
  res.send({
    status: 0, // 0 表示处理成功，1 表示处理失败
    msg: 'GET 请求成功！', // 状态的描述
    data: query, // 需要响应给客户端的数据
  })
})

// 定义 POST 接口
router.post('/post', (req, res) => {
  // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
  const body = req.body
  // 调用 res.send() 方法，向客户端响应结果
  res.send({
    status: 0,
    msg: 'POST 请求成功！',
    data: body,
  })
})

// 定义 DELETE 接口
router.delete('/delete', (req, res) => {
  res.send({
    status: 0,
    msg: 'DELETE请求成功',
  })
})

module.exports = router
```

### 3.CORS**跨域资源共享**

#### (1) CORS（主流的解决方案，推荐使用）

CORS （Cross-Origin Resource Sharing，跨域资源共享）由一系列 HTTP 响应头组成，**这些** **HTTP** **响应头决定浏览器是否阻止前端** **JS** **代码跨域获取资源**。

浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可以解除浏览器端的跨域访问限制。

①CORS 主要在服务器端进行配置。客户端浏览器**无须做任何额外的配置**，即可请求开启了 CORS 的接口。

②CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。

使用步骤分为如下 3 步：

​	①运行 npm install cors 安装中间件

​	②使用 const cors = require('cors') 导入中间件

​	③在路由之前调用 app.use(cors()) 配置中间件

> **CORS** **响应头部** **- Access-Control-Allow-**Origin

```js
// CORS 响应头部 - Access-Control-Allow-Origin 
// 下面的字段值将只允许来自 http://xxx.com 的请求：
res.setHeader('Access-Control-Allow-Origin','http://xxx.com')
// 如果指定了 Access-Control-Allow-Origin 字段的值为通配符 *，表示允许来自任何域的请求
res.setHeader('Access-Control-Allow-Origin','*')
```

> **CORS** **响应头部** **- Access-Control-Allow-**Headers

默认情况下，CORS **仅**支持客户端向服务器发送如下的 9 个请求头：

Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败！

```js
res.setHeader('Access-Control-Allow-Headers','Content-Type,X-Custom-Header')
```

> **CORS** **响应头部** **- Access-Control-Allow-**Methods

默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。

如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods来指明实际请求所允许使用的 HTTP 方法。

```js
res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,HEAD')
res.setHeader('Access-Control-Allow-Methods','*')
```

> **CORS**请求的分类

客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类，分别是：

**简单请求**,同时满足以下两大条件的请求，就属于简单请求：

① 请求方式：GET、POST、HEAD 三者之一

② HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain）

**预检请求**,只要符合以下任何一个条件的请求，都需要进行预检请求：

① 请求方式为 GET、POST、HEAD 之外的请求 Method 类型

② 请求头中包含自定义头部字段

③ 向服务器发送了 application/json 格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。

#### (2) JSONP（有缺陷的解决方案：只支持 GET 请求）

概念：浏览器端通过 <script> 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP。

特点：

①JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象。

②JSONP 仅支持 GET 请求，不支持POST、PUT、DELETE  等请求。

> 如果项目中已经配置了 CORS 跨域资源共享，为了**防止冲突**，必须在配置 CORS 中间件之前声明 JSONP 的接口。否则 JSONP 接口会被处理成开启了 CORS 的接口。示例代码如下：

​     **实现** **JSONP** **接口的步骤**  

①获取客户端发送过来的回调函数的名字

②得到要通过 JSONP 形式发送给客户端的数据

③根据前两步得到的数据，拼接出一个函数调用的字符串

④把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析执行

```js
app.get('/api/jsomp',(req,res)=>{
  const funcName = req.query.callback
  const data = {name: 'lxy',age:22}
  const scripStr = `${funcName}(${JSON.stringify(data)})`
  res.send(scriptStr)
})
```

```js
$.ajax({
  method: 'GET',
  dataType: 'jsonp'
})
```



## 十、mysql模块

> npm i mysql

### 1. 配置

```js
// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的 IP 地址
  user: 'root', // 登录数据库的账号
  password: '123456', // 登录数据库的密码
  database: 'dbname', // 指定要操作哪个数据库
})
```

### 2.测试

```js
db.query('select 1', (err, results) => {
  // mysql 模块工作期间报错了
  if(err) return console.log(err.message)
  // 能够成功的执行 SQL 语句
  console.log(results)
})
```

### 3.查询

```js
const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
  // 查询数据失败
  if (err) return console.log(err.message)
  // 查询数据成功
  // 注意：如果执行的是 select 查询语句，则执行的结果是数组
  console.log(results)
})
```

### 4.插入

```js
// 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
const user = { username: 'Spider-Man', password: 'pcc123' }
// 定义待执行的 SQL 语句
const sqlStr = 'insert into users (username, password) values (?, ?)'
// 执行 SQL 语句
db.query(sqlStr, [user.username, user.password], (err, results) => {
  // 执行 SQL 语句失败了
  if (err) return console.log(err.message)
  // 成功了
  // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
  // 可以通过 affectedRows 属性，来判断是否插入数据成功
  if (results.affectedRows === 1) {
    console.log('插入数据成功!')
  }
})
```

```js
// 演示插入数据的便捷方式
const user = { username: 'Spider-Man2', password: 'pcc4321' }
// 定义待执行的 SQL 语句
const sqlStr = 'insert into users set ?'
// 执行 SQL 语句
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('插入数据成功')
  }
})
```

### 5.更新

```js
// 演示如何更新用户的信息
const user = { id: 6, username: 'aaa', password: '000' }
// 定义 SQL 语句
const sqlStr = 'update users set username=?, password=? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
  if (results.affectedRows === 1) {
    console.log('更新成功')
  }
})
```

```js
// 演示更新数据的便捷方式
const user = { id: 6, username: 'aaaa', password: '0000' }
// 定义 SQL 语句
const sqlStr = 'update users set ? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('更新数据成功')
  }
})
```

### 6.删除

```js
// 删除 id 为 5 的用户
const sqlStr = 'delete from users where id=?'
db.query(sqlStr, 5, (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
  if (results.affectedRows === 1) {
    console.log('删除数据成功')
  }
}) 
```



## 十一、express-session

```js
npm install express-session
```

### 1.配置express-session中间件

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// TODO_01：请配置 Session 中间件
const session = require('express-session')
app.use(
  session({
    secret: 'liaoxingyu', // 为任意字符串
    resave: false, // 固定写法
    saveUninitialized: true, // 固定写法
  })
)
```

### 2. 向**session** **中**存数据

```js
// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  req.session.user = req.body // 用户的信息
  req.session.islogin = true // 用户的登录状态

  res.send({ status: 0, msg: '登录成功' })
})

```

### 3.从 **session** **中**取数据

```js
// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  })
})
```

### 4. 清空 **session**  

```js
// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})
```



```js
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1:80')
})

```

## 十二、jwt

JWT（英文全称：JSON Web Token）是目前**最流行**的**跨域认证解决方案**。

JWT 通常由三部分组成，分别是 Header（头部）、Payload（有效荷载）、Signature（签名）。

三者之间使用英文的“.”分隔，格式如下：

> Header.Payload.Signature

l **Payload** 部分**才是真正的用户信息**，它是用户信息经过加密之后生成的字符串。

l Header 和 Signature 是**安全性相关**的部分，只是为了保证 Token 的安全性。

### 1. **安装** **JWT** **相关的包**  

> npm i jsonwebtoken express-jwt

**jsonwebtoken** 用于**生成** **JWT** **字符串**

**express-**jwt 用于**将** **JWT** **字符串解析还原成** **JSON** **对象**

### 2. **导入** **JWT** **相关的包**

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())

// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
```

### 3. 定义 secret 密钥

```js
// TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'ouyuming ^_^'
```

### 4. **在登录成功**后生成 **JWT** **字符串**

```js
// 登录接口
app.post('/api/login', function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败！',
    })
  }
  // 登录成功
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期
  // 记住：千万不要把密码加密到 token 字符中
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr, // 要发送给客户端的 token 字符串
  })
})
```

### 5. JWT 字符串解析还原成 JSON

```js
// TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
```

### 6.使用 **req.user** **获取用户信息**  

```js
// 这是一个有权限的 API 接口
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user, // 要发送给客户端的用户信息
  })
})
```

### **7.** **捕获解析** **JWT** **失败后产生的错误**

```js
// TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
  console.log('Express server running at http://127.0.0.1:8888')
})
```

