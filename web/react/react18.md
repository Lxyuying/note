# React

两个js脚本：

```
react.development.js
```

- react 是react核心库，只要使用react就必须要引入
- 下载地址：https://unpkg.com/react@18.0.0/umd/react.development.js

```
react-dom.development.js
```

- react-dom 是react的dom包，使用react开发web应用时必须引入
- 下载地址：https://unpkg.com/react-dom@18.0.0/umd/react-dom.development.js



## 三个API

- ```
  React.createElement()
  ```

  - `React.createElement(type, [props], [...children])`
  - 用来创建React元素
  - React元素无法修改

- ```
  ReactDOM.createRoot()
  ```

  - `createRoot(container[, options])`
  - 用来创建React的根容器，容器用来放置React元素

- ```
  root.render()
  ```

  - `root.render(element)`
  - 当首次调用时，容器节点里的所有 DOM 元素都会被替换，后续的调用则会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。
  - 不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。

## JSX

 babel下载地址：https://unpkg.com/babel-standalone@6/babel.min.js 

注意事项：

1. 不要加引号
2. 有且只有一个根标签
3. html标签小写开头，React组件大写开头
4. 可以使用{}插入JS表达式。（表达式：有返回值的语句。JSX也是表达式）
5. 属性正常写（class使用className，style必须用{{}}）
6. 标签必须正常闭合
7. 布尔类型、Null 以及 Undefined 将会忽略



## 渲染列表

```jsx
const students = ['孙悟空', '猪八戒', '沙和尚'];
const ele = <ul>{students.map(item => <li key={item}>{item}</li>)}</ul>
```



## 创建React项目（手动）

开发步骤：

- 创建项目，目录结构如下

```
根目录
    - public
        - index.html （添加标签 <div id="root"></div>）
    - src
        - App.js
        - index.js
```

- 进入项目所在目录，并执行命令：`npm init -y` 或 `yarn init -y`
- 安装项目依赖：`npm install react react-dom react-scripts -S` 或 `yarn add react react-dom react-scripts`
- 运行`npx react-scripts start`启动项目（初次启动需要输入y确认）
- 或者将`react-scripts start`设置到`package.json`的scripts选项中，然后通过`npm start`启动（初次启动需要输入y确认）”scripts”: { “start”: “react-scripts start” }

index.html：

```
<!DOCTYPE html>
<html lang="zh">
<head>
   <meta charset="UTF-8">
   <title>Title</title>
</head>
<body>
<div id="root"></div>
</body>
</html>
```

App.js：

```
const App = () => {
   return <h1>Hello React!</h1>
}
export default App;
```

index.js：

```
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(element);
```



## React组件

### 函数组件

基于函数的组件其实就是一个会返回JSX（React元素）的普通的JS函数，你可以这样定义：

```
import ReactDOM from "react-dom/client";

// 这就是一个组件
function App(){
    return <h1>我是一个React的组件！</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
```

函数式组件主要有两个注意点：

1. 函数名首字母大写
2. 返回值是一个JSX（React元素）

为了使得项目结构更加的清晰，更易于维护，每个组件通常会存储到一个单独的文件中，比如上例中的App组件，可以存储到App.js中，并通过export导出。

```
App.js
function App(){
    return <h1>我是一个React的组件！</h1>
}

export default App;
```

或者使用箭头函数

```
const App = () => {
    return <h1>我是一个React的组件！</h1>;
};

export default App;
```

在其他文件中使用时，需要先通过import进行引入：

```
index.js
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
```

引入后通过`<组件名/>`或`<组件名>`即可引入组件。

在一个组件中可以直接使用其他组件，比如有如下`Button.js`:

```
const Button = () => {
    return <button>我是一个按钮</button>;
};

export default Button;
```

在`App.js`中可以直接引入该组件：

```
import Button from "./Button";

const App = () => {
    return <div>
        <h1>我是一个React的组件！</h1>
        <Button/>
    </div>;
};

export default App;
```

### 引入样式

那么如何为React组件引入样式呢？很简单直接在组件中import即可。例如：我们打算为Button组件编写一组样式，并将其存储到Button.css中。我们只需要直接在Button.js中引入Button.js就能轻易完成样式的设置。

Button.css：

```
button{
    background-color: #bfa;
}
```

Button.js：

```
import './Button.css';
const Button = () => {
    return <button>我是一个按钮</button>;
};
export default Button;
```

使用这种方式引入的样式，需要注意以下几点：

1. CSS就是标准的CSS语法，各种选择器、样式、媒体查询之类正常写即可。
2. 尽量将js文件和css文件的文件名设置为相同的文件名。
3. 引入样式时直接import，无需指定名字，且引入样式必须以./或../开头。
4. 这种形式引入的样式是全局样式，有可能会被其他样式覆盖。

### 类式组件

```js
import React from "react";

/*
*   类组件必须要继承React.Component
*       相较于函数组件，类组件的编写要麻烦一下，
*           但是他俩的功能是一样的
* */
class App extends React.Component{

    // 类组件中，必须添加一个render()方法，且方法的返回值要是一个jsx
    render() {
        return <div>我是一个类组件</div>;
    }
}

// 导出App
export default App;

```

## 事件

```js
 e.preventDefault(); // 取消默认行为    
 e.stopPropagation(); // 取消事件的传播
```



## Props

通过属性设置，为函数组件的第一个参数

read only



## State

### useState

useState()中需要传递一个初始值，这个值就是你希望在变量中存储的值。函数会返回一个数组，数组中有两个元素，第一个元素是存储了值的变量，第二个元素是一个函数用来对值进行修改 

```js
import React, {useState} from 'react';
```

```js
const [state, setState] = useState(initialState);
```

#### setState

异步

```js
setCount(prevState => prevState+1);
```



## Ref

```js
import React, {useRef} from 'react';

const MyComponent = () => {

    const divRef = useRef();

    const clickHandler = () => {
        console.log(divRef);
    };

    return (
            <div ref={divRef} onClick={clickHandler}>一个div</div>
           
    );
};

export default MyComponent;
```



## 类组件

```js
import React, {Component} from 'react';

class User extends Component {
    /*
    *   类组件的props是存储到类的实例对象中，
    *       可以直接通过实例对象访问
    *       this.props
    *   类组件中state统一存储到了实例对象的state属性中
    *       可以通过 this.state来访问
    *       通过this.setState()对其进行修改
    *           当我们通过this.setState()修改state时，
    *               React只会修改设置了的属性
    *
    *   函数组件中，响应函数直接以函数的形式定义在组件中，
    *       但是在类组件中，响应函数是以类的方法来定义，之前的属性都会保留
    *       但是这你仅限于直接存储于state中的属性
    *
    *   获取DOM对象
    *       1.创建一个属性，用来存储DOM对象
    *           divRef = React.createRef();
    *       2.将这个属性设置为指定元素的ref值
    * */

    // 创建属性存储DOM对象
    divRef = React.createRef();

    // 向state中添加属性
    state = {
        count: 0,
        test: '哈哈',
        obj: {name: '孙悟空', age: 18}
    };

    // 为了省事，在类组件中响应函数都应该以箭头函数的形式定义
    clickHandler = () => {
        // this.setState({count: 10});
        // this.setState(prevState => {
        //     return {
        //         count: prevState + 1
        //     }
        // });
        /*this.setState({
            obj:{...this.state.obj, name:'沙和尚'}
        });*/

        console.log(this.divRef);
    };


    render() {

        // console.log(this.props);
        // console.log(this.divRef);

        return (
            <div ref={this.divRef}>
                <h1>{this.state.count} --- {this.state.test}</h1>
                <h2>{this.state.obj.name} --- {this.state.obj.age}</h2>
                <button onClick={this.clickHandler}>点</button>
                <ul>
                    <li>姓名：{this.props.name}</li>
                    <li>年龄：{this.props.age}</li>
                    <li>性别：{this.props.gender}</li>
                </ul>
            </div>
        );
    }
}

export default User;

```



## Props.children

```js
import React from 'react'
import './index.css'

const Card = (props) => {
  const {className, children} = props
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}

export default Card
```



## 子->父

props.f 回调函数



## 双向绑定

state 绑定 value



## portal

index.html

```
<!--这个容器专门用来渲染遮罩层--><div id="backdrop-root"></div>
```

```
import {createPortal} from 'react-dom'

const backDrop = document.getElementById('backdrop-root')
const BackDrop = (props) => {
  const {children} = props
  return createPortal((<div className="backDrop">
    {children}
  </div>), backDrop)
}

export default BackDrop
```



## CSS Module

1. 使用CSS Module编写的样式文件的文件名必须为`xxx.module.css`
2. 在组件中引入样式的格式为`import xxx from './xxx.module.css'`
3. 设置类名时需要使用`xxx.yyy`的形式来设置



## Fragment

React.Fragment === <></>



## Context

### 创建context

```tsx
import {createContext} from 'react'
import {MealProps} from '../../../components/Meals/Meal'

interface Cart {
  items: MealProps[],
  totalAmount: Number,
  totalPrice: Number,

  addItem(meal: MealProps): void,

  removeItem(meal: MealProps): void

}

const cartContext = createContext<Cart>({
  items: [],
  totalAmount: 0,
  totalPrice: 0,
  addItem: (meal: MealProps) => {
  },
  removeItem: (meal: MealProps) => {
  }
})


export default cartContext
```

### 祖先元素

```tsx
import CartContext from "./store/cart-context";

<CartContext.Provider value={cartData}>
      <div className="App">
        <Meals {...mealsProps}/>
      </div>
 </CartContext.Provider>
```



## 移动端适配

```
document.documentElement.style.fontSize = 100 / 750 + 'vw'
```



## Effect

### useEffect语法

```
useEffect(didUpdate);
```

`useEffect()`需要一个函数作为参数，你可以这样写：

```
useEffect(()=>{    /* 编写那些会产生副作用的代码 */});
```

### 清除Effect

组件的每次重新渲染effect都会执行，有一些情况里，两次effect执行会互相影响。比如，在effect中设置了一个定时器，总不能每次effect执行都设置一个新的定时器，所以我们需要在一个effect执行前，清除掉前一个effect所带来的影响。要实现这个功能，可以在effect中将一个函数作为返回值返回，像是这样：

```
useEffect(()=>{    /* 编写那些会产生副作用的代码 */        return () => {        /* 这个函数会在下一次effect执行钱调用 */    };});
```

effect返回的函数，会在下一次effect执行前调用，我们可以在这个函数中清除掉前一次effect执行所带来的影响。

### 限制Effect

组件每次渲染effect都会执行，这似乎并不总那么必要。因此在`useEffect()`中我们可以限制effect的执行时机，在`useEffect()`中可以将一个数组作为第二个参数传递，像是这样：

```
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */

    return () => {
        /* 这个函数会在下一次effect执行前调用 */
    };
}, [a, b]);
```

上例中，数组中有两个变量a和b，设置以后effect只有在变量a或b发生变化时才会执行。这样即可限制effect的执行次数，也可以直接传递一个空数组，如果是空数组，那么effect只会执行一次。



## Reducer

```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

它的返回值和`useState()`类似，第一个参数是`state`用来读取`state`的值，第二个参数同样是一个函数，不同于`setState()`这个函数我们可以称它是一个“派发器”，通过它可以向`reducer()`发送不同的指令，控制`reducer()`做不同的操作。 

```
import {useReducer, useState} from 'react';

const reducer = (state, action) => {
    switch(action.type){
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
    }
};

function App() {

    const [count, countDispath] = useReducer(reducer,1);

    return (
        <div className="App">
            {count}

            <div>
                <button onClick={()=>countDispath({type:'sub'})}>-</button>
                <button onClick={()=>countDispath({type:'add'})}>+</button>
            </div>
        </div>
    );
}

export default App;
```