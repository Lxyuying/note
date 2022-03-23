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



## 三、http模块