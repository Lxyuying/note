# React18

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



## memo

```
export default React.memo(B);
```

这样一来，返回的B组件就增加了缓存功能，只有当B组件的props属性发生变化时，才会触发组件的重新渲染。memo只会根据props判断是否需要重新渲染，和state和context无关，state或context发生变化时，组件依然会正常的进行重新渲染。 



## useCallback

useCallback 是一个钩子函数，用来创建React中的回调函数

useCallback 创建的回调函数不会总在组件重新渲染时重新创建

```jsx
/*
*   useCallback()
*       参数：
*           1. 回调函数
*           2. 依赖数组
*               - 当依赖数组中的变量发生变化时，回调函数才会重新创建
*               - 如果不指定依赖数组，回调函数每次都会重新创建
*               - 一定要将回调函数中使用到的所有变量都设置到依赖数组中
*                   除了（setState）
* */
const clickHandler = useCallback(() => {
  setCount(prevState => prevState + num);
  setNum(prevState => num + 1);
}, [num]);
```



## fetch

......



## 自定义钩子

1. 创建一个函数，命名为useXxx
2. 在函数中正常调用React中的各种钩子
3. 在组件中引用钩子



## Redux Toolkit

```cmd
 npm install react-redux @reduxjs/toolkit -S 
```

### 基本使用

#### schoolSlice.js

```js
//创建学校的slice
import {createSlice} from "@reduxjs/toolkit";

const schoolSlice = createSlice({
    name:'school',
    initialState:{
        name:'花果山一小',
        address:'花果山大街28号'
    },
    reducers:{
        setName(state, action){
            state.name = action.payload;
        },
        setAddress(state, action){
            state.address = action.payload;
        }
    }
});

export const {setName, setAddress} = schoolSlice.actions;
export const {reducer:schoolReducer} = schoolSlice;

```

#### stuSlice.js

```js
// createSlice 创建reducer的切片
// 它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置
import {createSlice} from "@reduxjs/toolkit";

const stuSlice = createSlice({
    name:'stu', // 用来自动生成action中的type
    initialState:{
        name:'孙悟空',
        age:18,
        gender:'男',
        address:'花果山'
    }, // state的初始值
    reducers:{ // 指定state的各种操作，直接在对象中添加方法
        setName(state, action){
            // 可以通过不同的方法来指定对state的不同操作
            // 两个参数：state 这个state的是一个代理对象，可以直接修改
            state.name = action.payload;
        },
        setAge(state, action){
            state.age = action.payload;
        }
    }
});

// 切片对象会自动的帮助我们生成action
// actions中存储的是slice自动生成action创建器（函数），调用函数后会自动创建action对象
// action对象的结构 {type:name/函数名, payload:函数的参数}
export const {setName, setAge} = stuSlice.actions;
export const {reducer:stuReducer} = stuSlice;
```

#### store/index.js

```js
//使用RTK来构建store
import {configureStore} from "@reduxjs/toolkit";
import {stuReducer} from "./stuSlice";
import {schoolReducer} from "./schoolSlice";

// 创建store 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
   reducer:{
       student:stuReducer,
       school:schoolReducer
   }
});

export default store;

```

#### index.js

```js
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

```

#### app.jsx

```jsx
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setName, setAge} from './store/stuSlice';
import {setName as setSchoolName, setAddress as setSchoolAddress} from "./store/schoolSlice";

const App = () => {
    // useSelector() 用来加载state中的数据
    // const student = useSelector(state => state.student);
    // // 引入学校的state
    // const school = useSelector(state => state.school);
    const {student, school} = useSelector(state => state);


    // 通过useDispatch()来获取派发器对象
    const dispatch = useDispatch();
    // 获取action的构建器


    const setNameHandler = () => {
        dispatch(setName('沙和尚'));
    };

    const setAgeHandler = () => {
        dispatch(setAge(33));
    };

    return (
        <div>
            <p>
                {student.name} ---
                {student.age} ---
                {student.gender} ---
                {student.address}
            </p>
            <button onClick={setNameHandler}>修改name</button>
            <button onClick={setAgeHandler}>修改age</button>

            <hr/>

            <p>
                {school.name} ---
                {school.address}
            </p>
            <button onClick={()=>dispatch(setSchoolName('高老庄中小'))}>修改学校名字</button>
            <button onClick={()=>dispatch(setSchoolAddress('高老庄府前街19号'))}>修改学校地址</button>
        </div>
    );
};

export default App;
```





### RTK Query

RTKQ已经集成在了RTK中，如果我们已经在项目中引入了RTK则无需再引入其余的模块。如果你不想使用RTKQ给我们提供的发送请求的方式（简单封装过的fetch），你还需要引入一下你要使用的发送请求的工具。

#### 创建Api切片

RTKQ中将一组相关功能统一封装到一个Api对象中，比如：都是学生相关操作统一封装到StudentApi中，关于班级的相关操作封装到ClassApi中。接下来，我们尝试创建一个简单的Api，至于数据还是我们之前所熟悉的学生数据：

studentApi.js

```
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";export const studentApi = createApi({    reducerPath:'studentApi',    baseQuery:fetchBaseQuery({        baseUrl:'http://localhost:1337/api/'    }),    endpoints(build) {        return {            getStudents: build.query({                query() {                    return 'students'                }            }),        }    }});export const {useGetStudentsQuery} = studentApi;
```

上例是一个比较简单的Api对象的例子，我们来分析一下，首先我们需要调用`createApi()`来创建Api对象。这个方法在RTK中存在两个版本，一个位于`@reduxjs/toolkit/dist/query`下，一个位于`@reduxjs/toolkit/dist/query/react`下。react目录下的版本会自动生成一个钩子，方便我们使用Api。如果不要钩子，可以引入query下的版本，当然我不建议你这么做。

`createApi()`需要一个配置对象作为参数，配置对象中的属性繁多，我们暂时介绍案例中用到的属性：

reducerPath

用来设置reducer的唯一标识，主要用来在创建store时指定action的type属性，如果不指定默认为api。

baseQuery

用来设置发送请求的工具，就是你是用什么发请求，RTKQ为我们提供了fetchBaseQuery作为查询工具，它对fetch进行了简单的封装，很方便，如果你不喜欢可以改用其他工具，这里暂时不做讨论。

fetchBaseQuery

简单封装过的fetch调用后会返回一个封装后的工具函数。需要一个配置对象作为参数，baseUrl表示Api请求的基本路径，指定后请求将会以该路径为基本路径。配置对象中其他属性暂不讨论。

endpoints

Api对象封装了一类功能，比如学生的增删改查，我们会统一封装到一个对象中。一类功能中的每一个具体功能我们可以称它是一个端点。endpoints用来对请求中的端点进行配置。

endpoints是一个回调函数，可以用普通方法的形式指定，也可以用箭头函数。回调函数中会收到一个build对象，使用build对象对点进行映射。回调函数的返回值是一个对象，Api对象中的所有端点都要在该对象中进行配置。

对象中属性名就是要实现的功能名，比如获取所有学生可以命名为getStudents，根据id获取学生可以命名为getStudentById。属性值要通过build对象创建，分两种情况：

查询：`build.query({})`

增删改：`build.mutation({})`

例如：

```
getStudents: build.query({
    query() {
        return 'students'
    }
}),
```

先说query，query也需要一个配置对象作为参数（又他喵的是配置对象）。配置对象里同样有n多个属性，现在直说一个，query方法。注意不要搞混两个query，一个是build的query方法，一个是query方法配置对象中的属性，这个方法需要返回一个子路径，这个子路径将会和baseUrl拼接为一个完整的请求路径。比如：getStudets的最终请求地址是:

```
http://localhost:1337/api/`+`students`=`http://localhost:1337/api/students
```

可算是介绍完了，但是注意了这个只是最基本的配置。RTKQ功能非常强大，但是配置也比较麻烦。不过，熟了就好了。

上例中，我们创建一个Api对象studentApi，并且在对象中定义了一个getStudents方法用来查询所有的学生信息。如果我们使用react下的createApi，则其创建的Api对象中会自动生成钩子函数，钩子函数名字为useXxxQuery或useXxxMutation，中间的Xxx就是方法名，查询方法的后缀为Query，修改方法的后缀为Mutation。所以上例中，Api对象中会自动生成一个名为useGetStudentsQuery的钩子，我们可以获取并将钩子向外部暴露。

```
export const {useGetStudentsQuery} = studentApi;
```

#### 创建Store对象

Api对象的使用有两种方式，一种是直接使用，一种是作为store中的一个reducer使用。store是我们比较熟悉的，所以先从store入手。

```
import {configureStore} from "@reduxjs/toolkit";
import {studentApi} from "./studentApi";

export const store = configureStore({
    reducer:{
        [studentApi.reducerPath]:studentApi.reducer
    },
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(studentApi.middleware),
});
```

创建store并没有什么特别，只是注意需要添加一个中间件，这个中间件已自动生成了我们直接引入即可，中间件用来处理Api的缓存。

store创建完毕同样要设置Provider标签，这里不再展示。接下来，我们来看看如果通过studentApi发送请求。由于我们已经将studentApi中的钩子函数向外部导出了，所以我们只需通过钩子函数即可自动加载到所有的学生信息。比如，现在在App.js中加载信息可以这样编写代码：

```
import React from 'react';
import {useGetStudentsQuery} from './store/studentApi';

const App = () => {
    const {data, isFetching, isSuccess} = useGetStudentsQuery();

    return (
        <div>
            {isFetching && <p>数据正在加载...</p>}
            {isSuccess && data.data.map(item => <p key={item.id}>
                {item.attributes.name} --
                {item.attributes.age} --
                {item.attributes.gender} --
                {item.attributes.address}
            </p>)}
        </div>
    );
};

export default App;
```

直接调用useGetStudentsQuery()它会自动向服务器发送请求加载数据，并返回一个对象。这个对象中包括了很多属性：

1. data – 最新返回的数据
2. currentData – 当前的数据
3. error – 错误信息
4. isUninitialized – 如果为true则表示查询还没开始
5. isLoading – 为true时，表示请求正在第一次加载
6. isFetching 为true时，表示请求正在加载
7. isSuccess 为true时，表示请求发送成功
8. isError 为true时，表示请求有错误
9. refetch 函数，用来重新加载数据



#### example

store/studentApi.js

```js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


// 创建Api对象
//createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),// 指定查询的基础信息，发送请求使用的工具
    tagTypes: ['student'], // 用来指定Api中的标签类型
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents: build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                },
                // transformResponse 用来转换响应数据的格式
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },

                providesTags: [{type: 'student', id: 'LIST'}]
            }),
            getStudentById: build.query({
                query(id) {
                    //http://localhost:1337/api/students/23
                    return `students/${id}`;
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },
                keepUnusedDataFor: 60, // 设置数据缓存的时间，单位秒 默认60s
                providesTags: (result, error, id) => [{type: 'student', id}]
            }),
            delStudent: build.mutation({
                query(id) {
                    //http://localhost:1337/api/students/4
                    return {
                        // 如果发送的get请求，需要返回一个对象来设置请求的信息
                        url: `students/${id}`,
                        method: 'delete'
                    };
                }
            }),
            addStudent: build.mutation({
                query(stu) {
                    return {
                        url: 'students',
                        method: 'post',
                        body: {data: stu}
                    };
                },
                invalidatesTags: [{type: 'student', id: 'LIST'}]
            }),
            updateStudent: build.mutation({
                query(stu) {
                    return {
                        url: `students/${stu.id}`,
                        method: 'put',
                        body: {data: stu.attributes}
                    };
                },
                invalidatesTags: ((result, error, stu) =>
                    [{type: 'student', id: stu.id}, {type: 'student', id: 'LIST'}])
            }),

        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useDelStudentMutation,
    useAddStudentMutation,
    useUpdateStudentMutation
} = studentApi;

export default studentApi;
```

store/index.js

```js
import {configureStore} from "@reduxjs/toolkit";
import studentApi from "./studentApi";
import {setupListeners} from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer:{
        [studentApi.reducerPath]:studentApi.reducer
    },

    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(studentApi.middleware)
});

setupListeners(store.dispatch); // 设置以后，将会支持 refetchOnFocus refetchOnReconnect

export default store;

```

App.js

```js
import React from 'react';
import {useDelStudentMutation, useGetStudentsQuery} from "./store/studentApi";
import StudentList from "./components/StudentList";


const App = () => {

    const result = useGetStudentsQuery(null, {
        // useQuery可以接收一个对象作为第二个参数，通过该对象可以对请求进行配置
        // selectFromResult: result => {
        //     if (result.data) {
        //         result.data = result.data.filter(item => item.attributes.age < 18);
        //     }
        //
        //     return result;
        // }, // 用来指定useQuery返回的结果

        pollingInterval:0, // 设置轮询的间隔，单位毫秒 如果为0则表示不轮询
        skip:false, // 设置是否跳过当前请求，默认false
        refetchOnMountOrArgChange:false, // 设置是否每次都重新加载数据 false正常使用缓存，
                                            // true每次都重载数据
                                            //数字，数据缓存的时间（秒）
        refetchOnFocus:false, // 是否在重新获取焦点时重载数据
        refetchOnReconnect:true, // 是否在重新连接后重载数据
    });

    /*
        currentData: undefined // 当前参数的最新数据
        data: undefined // 最新的数据
        isError: false // 布尔值，是否有错误
        error: Error() // 对象，有错时才存在
        isFetching: true // 布尔值，数据是否在加载
        isLoading: true // 布尔值，数据是否第一次加载
        isSuccess: false // 布尔值，请求是否成功
        isUninitialized: false // 布尔值，请求是否还没有开始发送
        refetch: ƒ () // 一个函数，用来重新加载数据
        status: "pending" // 字符串，请求的状态
    * */


    const {data: stus, isSuccess, isLoading, refetch} = result; // 调用Api中的钩子查询数据


    return (
        <div>
            <button onClick={() => refetch()}>刷新</button>
            {isLoading && <p>数据加载中...</p>}
            {isSuccess && <StudentList stus={stus}/>}
        </div>
    );
};

export default App;
```



## router-v5

安装：

npm

```
npm install react-router-dom@5 -S
```

yarn

```
yarn add react-router-dom@5
```

### 基本使用

```
import ReactDOM from "react-dom/client";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";


const Home = () => {
    return <div>这是首页</div>;
};

const About = () => {
    return <div>关于我们，其实没啥可说的</div>
};


const App = () => {
    return <div>
        <ul>
            <li>
                <Link to="/home">首页</Link>
            </li>
            <li>
                <Link to="/about">关于</Link>
            </li>
        </ul>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
        </Switch>
    </div>;
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
```

### 解析

#### 1. React-Router-Dom包

react router适用于web和原生项目，我们在web项目中使用，所以需要引入的包是react-router-dom。

#### 2. BrowserRouter组件

和Redux类似，要使得路由生效，需要使用Router组件将App组件包裹起来。这里我们选择的是BrowserRouter，除了BrowserRouter外还有其他的Router，暂时我们只介绍BrowserRouter。

案例中，BrowserRouter我们是这样使用的：

```
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
```

实际开发中，也可以为BrowserRouter起一个别名Router，这样一来我们在切换Router时，只需要修改引用位置，而不需要修改其他代码，像是这样：

```
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App/>
    </Router>
);
```

#### 3. Route组件

route组件是路由的映射组件，通过该组件将url地址和React组件进行映射，映射后当url地址变为指定地址时指定的组件就会显示，否则不显示。

```
<Route path="/home" component={Home} />
<Route path="/about" component={About} />
```

上例中，路径`/home`和``组件进行了映射，路径`/about`和``组件进行了映射。当访问`http://localhost:3000/about`时，about组件会自动渲染显示，访问`http://localhost:3000/home`时，home组件会自动渲染显示。

Route组件可以设置以下几个属性

1. path
2. exact
3. strict
4. component
5. render
6. children
7. location
8. sensitive

path

用来设置要映射的路径，可以是一个字符串或字符串数组。字符串用来匹配单个路径，数组可以匹配多个路径。看一个数组的例子：

```
<Route path={["/about", "/hello"]}>
    <About/>
</Route>
```

使用数组映射后，当我们访问数组中的路径时都会使组件挂载。设置路径时也可以在路径中设置参数，比如：`/student/:id`其中id就是一个参数，可以动态的传递`:id`的值，换句话说`/student/1`或`/student/2`，都会触发组件挂载。

设置动态参数后，在组件的内部可以使用`useParams()`钩子来读取参数：

```
const Student = () => {
    const {id} = useParams();
    return <div>学生id：{id}</div>
};

...略...
<Route path="/student/:id">
    <Student/>
</Route>
...略...
```

exact

路由的匹配默认并不是完整匹配，这意味着路由映射的地址是`/home`时，只要我们访问的路径是以`/home`开头就会触发组件的挂载，默认情况下是不会检查路由的子路径的。比如：`/home/hello`、`/home/abc`等都会导致home组件挂载。

exact属性用来设置路由地址是否完整匹配，它需要一个布尔值，默认为false，就像上边的情况。如果设置为true，那么只有地址和path完全一致时，组件才会挂载。

```
<Route path="/home" exact>
    <Home/>
</Route>
```

这样一来只有访问`/home`时，home组件才会挂载，差一个字母都不行哦！

strict

布尔值，默认值为false。false时，会匹配到以`/`结尾的路径。比如：path设置为`/home`默认情况下`/home/`也会导致组件挂载。设置为true时，以`/`结尾的路径不会被匹配。

component

设置路径匹配后需要挂载的组件。作用和Route的标签体类似。

```
<Route path="/home" component={Home}/>
```

和标签体指定组件不同，如果通过component属性指定组件，React Router会自动向组件中传递三个参数match、location和history。

match

对象，表示请求匹配的路径信息，其中包含四个属性：

1. param —— 请求参数
2. isExact —— 布尔值，请求路径是否完整匹配
3. path —— 请求路径的规则
4. url —— 匹配到的url地址

location

对象，表示浏览器地址栏的信息，请求完整路径、查询字符串等，可能具有的属性：

1. pathname —— 请求的路径
2. search —— 查询字符串
3. hash —— hash字符串
4. state —— 历史记录中的状态对象，可以用来在跳转时传递数据

history

对象，用来读取和操作浏览器的历史记录（页面跳转）等功能，属性：

1. length —— 历史记录的数量
2. action —— 当前历史记录的状态，pop（前进、后退、新记录创建、索引发生变化）；push（新记录添加）；replace（历史记录被替换）
3. location —— location对象
4. push() —— 添加新的历史记录
5. replace() —— 替换历史记录
6. go() —— 跳转到指定记录
7. goBack() —— 回退
8. goForward() —— 前进
9. block() —— 用来阻止用户跳转行为，可以用Prompt组件代替

render

render也是Route组件中的属性，和component类似，也用来指定路径匹配后需要挂载的组件。只是render需要的是一个回调函数作为参数，组件挂载时，render对应的回调函数会被调用，且函数的返回值会成为被挂载的组件。render的回调函数中会接收到一个对象作为参数，对象中包含三个属性，即match、location和history，我们可以根据需要选择是否将其传递给组件。

```
<Route path="/student/:id" render={routeProps => <Student {...routeProps}/>} />
```

children

children实际上就是组件的组件体，设置方式有两种一个是通过组件体设置，一个是通过children属性设置。它的值也有两种方式，一种直接传递组件，这样当路径匹配时组件会自动挂载。一种是传递一个回调函数，这样它和render的特点是一样的。

直接设置组件：

```
<Route path="/student/:id" children={<Student/>} />
<Route path="/student/:id">
    <Student/>
</Route>
```

传递回调函数：

```
<Route path="/student/:id" children={routeProps => <Student {...routeProps}/>} />
<Route path="/student/:id">
    {routeProps => <Student {...routeProps}/>}
</Route>
```

需要注意的时，当children接收到的是一个回调函数时，即使路径没有匹配组件也会被挂载到页面中（没有使用Switch标签的情况下），这一特性可以在一些特殊应用场景下发挥作用。如果不希望出现路径不匹配时组件被挂载的情况，最好选择使用render来代替。

#### 4. Switch组件

Switch组件是Route组件的外部容器，可以将Route组件放入到Switch组件中。放入Switch组件中后，匹配路径时会自动自上向下对Route进行匹配，如果匹配到则挂载组件，并且一个Switch中只会有一个Route被挂载。如果将Route组件单独使用，那么所有的路径匹配的Route中的组件都会被挂载。

#### 5. Link组件

Link组件作用类似于a标签（超链接），并且Link组件在浏览器中也会被渲染为超链接。但是Link组件生成的链接点击后只会修改浏览器地址栏的url，并不会真的向服务器发送请求。这种方式有利于组件的渲染，所以在开发中应该使用Link组件而不是超链接。

### 其他组件

#### 1. HashRouter组件

除了BrowserRouter以外，react router中还为我们提供了HashRouter，它是干什么用的呢？其实很简单，当我们使用BrowserRouter时，路径会直接根据url地址进行跳转，也就是我们在使用应用时在浏览器的地址栏看到的地址就和我们正常去访问网页一样。

但是，HashRouter不是这样，使用HashRouter时，组件的跳转不再是以完整的url形式，而是通过url地址中的hash值进行跳转（url地址中#后的内容为hash值）。

BrowserRouter的地址栏

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/06/20220609180542950.png)

HashRouter的地址栏

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/06/20220609180515252.png)

为什么会有这两种Router呢？首先，你要明确我们的项目在开发完成后需要进行构建，构建后的代码需要放到服务器中，以供用户访问。服务器无非就是Nginx或Apache这些东西，服务器的主要功能是将url地址和网页进行映射。传统web项目中，每一个页面都对应一个文件，当用户访问/index.html时，服务器会自动返回根目录下的index.html。当用户访问/about.html时，服务器会返回根目录下about.html。换句话说url和文件的映射都是由服务器来完成的。

但是React项目不同，React项目所有的页面都是通过React进行渲染构建的。项目中只存在一个index.html没有那么多的页面（所以才叫单页应用）。当浏览器地址发生变化时，比如用户访问/about时，此时是不需要服务器介入的，react router会自动挂载对应的组件。

当我们将React项目部署到服务器时，如果直接访问根目录，请求会直接发送给index.html。这个页面我们是有的，所以此时不会有任何问题。用户访问页面后，点击页面后的连接切换到不同的组件也没有问题，因为页面并没有真的发生跳转，而是通过react router在内存中完成了模拟跳转。但是，当我们刷新某个路由或直接通过浏览器地址栏访问某个路由时，比如：http://localhost:3000/about，此时请求会发送给服务器，服务器会寻找名为about的资源（此时并没有经过React）。显然找不到这个资源，于是返回404。

这样一来，我们的项目只能够通过首页访问，然后点击链接跳转，刷新和直接通过路由访问都是不行的，一旦进行这些操作就会出现404。

怎么办呢？两种解决方式：

1. 使用HashRouter，HashRouter通过hash地址跳转，而服务器不会处理hash地址，这样地址就会交由React处理，路由便可正常跳转。缺点是url地址上总会多出一个#，但不妨碍使用。
2. 修改服务器映射规则，将所有的请求交给React处理，禁止服务器自动匹配页面。以nginx为例，可以将`nginx.conf`中的配置信息修改如下：

```
location / {
    root   html;
    try_files $uri /index.html;
}
```

两种方式都可以解决404的问题，具体采用那种方案，需要根据你自己项目的实际情况选择。

#### 2. NavLink组件

特殊版本的Link，可以根据不同的情况设置不同的样式。

属性：

1. activeClassName —— 字符串 链接激活时的class
2. activeStyle —— 对象 链接激活时的样式
3. isActive —— 函数，可动态判断链接是否激活
4. style —— 函数，动态设置样式
5. className —— 函数，动态设置class值

#### 3. Prompt组件

prompt组件可以在用户离开页面前弹出提示。

属性：

1. message 字符串/函数，设置离开前显示的提示信息
2. when布尔值，设置是否显示提示

#### 4. Redirect组件

将请求重定向到一个新的位置，经常用来进行权限的处理。例如：当用户已经登录时则正常显示组件，用户没有登录时则跳转到登录页面。

```
{isLogin && <SomeAuthComponent/>}
{!isLogin && <Redirect to={"/login"}></Redirect>}
```

上例中，如果isLogin的值为true，表示用户已经登录，若用户登录，则挂载对应组件。若isLogin值为false，则挂载Redirect组件触发重定向，重定向会使得路径跳转到登录页面。

属性：

1. to —— 重定向的目标地址，可以是一个字符串也可以是一个对象
2. from —— 需要重定向的地址
3. push —— 布尔值，是否使用push方式对请求进行重定向

#### 5. 钩子函数

1. useHistory
2. useLocation
3. useParams
4. useRouteMatch



## router-v6

安装：

npm

```
npm install react-router-dom@6 -S
```

yarn

```
yarn add react-router-dom@6
```

### HelloWorld

```
import React from ‘react’;
import ReactDOM from ‘react-dom/client’;
import { BrowserRouter as Router, Link, Route, Routes } from ‘react-router-dom’;

const Home = ()=>{
  return <div>首页</div>
};

const About = () => {
  return <div>关于</div>
};

const App = () => {
  return <div>App
    <ul>
      <li>
        <Link to=”/”>home</Link>
      </li>
      <li>
        <Link to=”/about”>about</Link>
      </li>
    </ul>

    <Routes>
      <Route path=”/” element={<Home/>}/>
      <Route path=”/about” element={<About/>}/>
    </Routes>
  </div>;
};

const root = ReactDOM.createRoot(document.getElementById(‘root’));

root.render(
  <Router>
    <App />
  </Router>
);
```

### Routes组件

和版本5不同，6中的Route组件不能单独使用，而是必须要放到Routes组件中。简言之Routes就是一个存放Route的容器。

### Route组件

Route作用和版本5的一样，只是变得更简单了，没有了那么多复杂的属性，并且Route组件必须放到Routes中，当浏览器的地址发生变化时，会自动对Routes中的所有Route进行匹配，匹配到的则显示，其余Route则不再继续匹配。可以将Route当成是一个类似于if语句的东西，路径（path）匹配则其中的组件便会被渲染。

1. path —— 要匹配的路径
2. element —— 路径匹配后挂载的组件，直接传JSX
3. index —— 布尔值，路由是否作为默认组件显示

### Outlet组件

Outlet组件用来在父级路由中挂载子路由。

在版本6中Route组件是可以嵌套的，可以通过嵌套Route来构建出嵌套路由，像这样：

```
<Route path='/students' element={<StudentList/>}>
    <Route path=':id' element={<Student/>}/>
</Route>
```

上例中，Route嵌套后，如果访问`/students`则会挂载StudentList组件，如果访问`/students/:id`则会自动在StudentList组件中对Student组件进行挂载。在StudentList组件中就可以使用Outlet来引用这些被挂载的组件。

```
const StudentList = () => {
    return <div>
        学生列表
        <Outlet/>
    </div>
};
```

### Link组件

和版本5的类似，具体区别看视频

### NavLink组件

和版本5的类似，具体区别看视频

### Navigate

类似于版本5中的Redirect组件，用来跳转页面，具体看视频

### 部分钩子函数

1. useLocation —— 获取地址信息的钩子
2. useNavigate —— 获取Navigate对象的钩子
3. useParams —— 获取请求参数
4. useMatch —— 检查路径是否匹配某个路由



## hooks

### UseMemo

useMemo和useCallback十分相似，useCallback用来缓存函数对象，useMemo用来缓存函数的执行结果。在组件中，会有一些函数具有十分的复杂的逻辑，执行速度比较慢。闭了避免这些执行速度慢的函数返回执行，可以通过useMemo来缓存它们的执行结果，像是这样：

```
const result = useMemo(()=>{
    return 复杂逻辑函数();
},[依赖项])
```

useMemo中的函数会在依赖项发生变化时执行，注意！是执行，这点和useCallback不同，useCallback是创建。执行后返回执行结果，如果依赖项不发生变化，则一直会返回上次的结果，不会再执行函数。这样一来就避免复杂逻辑的重复执行。

### UseImperativeHandle

在React中可以通过forwardRef来指定要暴露给外部组件的ref：

```
const MyButton = forwardRef((props, ref) => {    return <button ref={ref}>自定义按钮</button>});
```

上例中，MyButton组件将button的ref作为组件的ref向外部暴露，其他组件在使用MyButton时，就可以通过ref属性访问：

```
<MyButton ref={btnRef}/>
```

通过useImperativeHandle可以手动的指定ref要暴露的对象，比如可以修改MyButton组件如下：

```
const MyButton = forwardRef((props, ref) => {    useImperativeHandle(ref,()=> {        return {            name:'孙悟空'        };    });    return <button>自定义按钮</button>});
```

useImperativeHandle的第二个参数是一个函数，函数的返回值会自动赋值给ref（current属性）。上例中，我们将返回值为`{name:'孙悟空'}`，当然返回孙悟空没有什么意义。实际开发中，我们可以将一些操作方法定义到对象中，这样可以有效的减少组件对DOM对象的直接操作。

```
const MyButton = forwardRef((props, ref) => {

    const btnRef = useRef();

    useImperativeHandle(ref,()=> {
        return {
            setDisabled(){
                btnRef.current.disabled = true;
            }
        };
    });

    return <button ref={btnRef}>自定义按钮</button>
});

const App = () => {
    
    const btnRef = useRef();

    const clickHandler = () => {
        btnRef.current.setDisabled();
    };

    return <div>
        <MyButton ref={btnRef}/>
        <button onClick={clickHandler}>点击</button>
    </div>;
};
```

### UseLayoutEffect

useLayoutEffect的方法签名和useEffect一样，功能也类似。不同点在于，useLayoutEffect的执行时机要早于useEffect，它会在DOM改变后调用。在老版本的React中它和useEffect的区别比较好演示，React18中，useEffect的运行方式有所变化，所以二者区别不好演示。

useLayoutEffect使用场景不多，实际开发中，在effect中需要修改元素样式，且使用useEffect会出现闪烁现象时可以使用useLayoutEffect进行替换。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/06/20220622111732278.png)

### UseDebugValue

用来给自定义钩子设置标签，标签会在React开发工具中显示，用来调试自定义钩子，不常用。

### UseDeferredValue

useDeferredValue用来设置一个延迟的state，比如我们创建一个state，并使用useDeferredValue获取延迟值：

```
const [queryStr, setQueryStr] = useState('');const deferredQueryStr = useDeferredValue(queryStr);
```

上边的代码中queryStr就是一个常规的state，deferredQueryStr就是queryStr的延迟值。设置延迟值后每次调用setState后都会触发两次组件的重新渲染。第一次时，deferredQueryStr的值是queryStr修改前的值，第二次才是修改后的值。换句话，延迟值相较于state来说总会慢一步更新。

延迟值可以用在这样一个场景，一个state需要在多个组件中使用。一个组件的渲染比较快，而另一个组件的渲染比较慢。这样我们可以为该state创建一个延迟值，渲染快的组件使用正常的state优先显示。渲染慢的组件使用延迟值，慢一步渲染。当然必须结合React.memo或useMemo才能真正的发挥出它的作用。

### UseTransition

当我们在组件中修改state时，会遇到复杂一些的state，当修改这些state时，甚至会阻塞到整个应用的运行，为了降低这种state的影响，React为我们提供了useTransition，通过useTransition可以降低setState的优先级。

useTransition会返回一个数组，数组中有两个元素，第一个元素是isPending，它是一个变量用来记录transition是否在执行中。第二个元素是startTransition，它是一个函数，可以将setState在其回调函数中调用，这样setState方法会被标记为transition并不会立即执行，而是在其他优先级更高的方法执行完毕，才会执行。

除了useTransition外，React还直接为为我们提供了一个startTransition函数，在不需要使用isPending时，可以直接使用startTransition也可以达到相同的效果。

### UseId

生成唯一id，使用于需要唯一id的场景，但不适用于列表的key。