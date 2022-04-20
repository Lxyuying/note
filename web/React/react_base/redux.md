# 一、redux精简版

## (1) src下建立:

​     redux

​     store.js

​     count_reducer.js



##   (2) store.js

​     1).引入redux中的createStore函数，创建一个store

​     2).createStore调用时要传入一个为其服务的reducer

​     3).记得暴露store对象

```js
/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './count_reducer'
//暴露store
export default createStore(countReducer)
```



##   (3) count_reducer.js

​     1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态

​     2).reducer有两个作用：初始化状态，加工状态

​	 3).reducer被第一次调用时，是store自动触发的，

​         传递的preState是undefined,

​         传递的action是:{type:'@@REDUX/INIT_a.2.b.4}

```js
/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/

const initState = 0 //初始化状态
export default function countReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type,data} = action
	//根据type决定如何加工数据
	switch (type) {
		case 'increment': //如果是加
			return preState + data
		case 'decrement': //若果是减
			return preState - data
		default:
			return preState
	}
}
```



## (4) 组件内使用

​	 1）获取数据  store.getState()

​	 2）修改数据  store.dispatch({type:'decrement',data:value*1})

## (5) dom更新

redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。

​	 1）组件内更新

```jsx
componentDidMount(){
	检测redux中状态的变化，只要变化，就调用render
	store.subscribe(()=>{
		this.setState({})
	})
}
```

​	 2）重新渲染<App/>

```jsx
store.subscribe(()=>{
	ReactDOM.render(<App/>,document.getElementById('root'))
})
```



# 二、Action

```js
/* 
	该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错
*/
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

```js
/* 
	该文件专门为Count组件生成action对象
*/
import {INCREMENT,DECREMENT} from './constant'

export const createIncrementAction = data => ({type:INCREMENT,data})
export const createDecrementAction = data => ({type:DECREMENT,data})
```



# 三、异步Action

1、yarn add redux-thunk

```js
//该文件专门用于暴露一个store对象，整个应用只有一个store对象

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './count_reducer'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//暴露store
export default createStore(countReducer,applyMiddleware(thunk))
```

```js
//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const createIncrementAsyncAction = (data,time) => {
	return (dispatch)=>{
		setTimeout(()=>{
			dispatch(createIncrementAction(data))
		},time)
	}
}
```



# 四、react-redux

## 1、containers

### (1) Count

```jsx
import React, { Component } from 'react'
//引入action
import {
	increment,
	decrement,
	incrementAsync
} from '../../redux/actions/count'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

//定义UI组件
class Count extends Component {

	state = {carName:'奔驰c63'}

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		this.props.increment(value*1)
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		this.props.decrement(value*1)
	}
	//奇数再加
	incrementIfOdd = ()=>{
		const {value} = this.selectNumber
		if(this.props.count % 2 !== 0){
			this.props.increment(value*1)
		}
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		this.props.incrementAsync(value*1,500)
	}

	render() {
		//console.log('UI组件接收到的props是',this.props);
		return (
			<div>
				<h2>我是Count组件,下方组件总人数为:{this.props.renshu}</h2>
				<h4>当前求和为：{this.props.count}</h4>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
	state => ({
		count:state.count,
		personCount:state.persons.length
	}),
	{increment,decrement,incrementAsync}
)(Count)

```

### (2) Person

```jsx
import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import {connect} from 'react-redux'
import {addPerson} from '../../redux/actions/person'

class Person extends Component {

	addPerson = ()=>{
		const name = this.nameNode.value
		const age = this.ageNode.value*1
		const personObj = {id:nanoid(),name,age}
		this.props.addPerson(personObj)
		this.nameNode.value = ''
		this.ageNode.value = ''
	}

	render() {
		return (
			<div>
				<h2>我是Person组件,上方组件求和为{this.props.count}</h2>
				<input ref={c=>this.nameNode = c} type="text" placeholder="输入名字"/>
				<input ref={c=>this.ageNode = c} type="text" placeholder="输入年龄"/>
				<button onClick={this.addPerson}>添加</button>
				<ul>
					{
						this.props.persons.map((p)=>{
							return <li key={p.id}>{p.name}--{p.age}</li>
						})
					}
				</ul>
			</div>
		)
	}
}

export default connect(
	state => ({
		persons:state.persons,
		count:state.count
	}),//映射状态
	{addPerson}//映射操作状态的方法
)(Person)

```



## 2、redux

### (1) store.js

```js
/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware} from 'redux'
//引入汇总之后的reducer
import reducer from './reducers'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'

//暴露store 
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
```

### (2) constant.js

```js
/* 
	该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错
*/
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
export const ADD_PERSON = 'add_person'
```

### (3) actions

​	① count.js

```js
/* 
	该文件专门为Count组件生成action对象
*/
import {INCREMENT,DECREMENT} from '../constant'

//同步action，就是指action的值为Object类型的一般对象
export const increment = data => ({type:INCREMENT,data})
export const decrement = data => ({type:DECREMENT,data})

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const incrementAsync = (data,time) => {
	return (dispatch)=>{
		setTimeout(()=>{
			dispatch(increment(data))
		},time)
	}
}
```

​	② person.js

```js
import {ADD_PERSON} from '../constant'

//创建增加一个人的action动作对象
export const addPerson = personObj => ({type:ADD_PERSON,data:personObj})
```

### (4) reducers

#### 	① index.js

```js
/* 
	该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux'
//引入为Count组件服务的reducer
import count from './count'
//引入为Person组件服务的reducer
import persons from './person'

//汇总所有的reducer变为一个总的reducer
export default  combineReducers({
	count,
	persons
})

```

#### 	② count.js

```js
/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import {INCREMENT,DECREMENT} from '../constant'

const initState = 0 //初始化状态
export default function countReducer(preState=initState,action){
	// console.log('countReducer@#@#@#');
	//从action对象中获取：type、data
	const {type,data} = action
	//根据type决定如何加工数据
	switch (type) {
		case INCREMENT: //如果是加
			return preState + data
		case DECREMENT: //若果是减
			return preState - data
		default:
			return preState
	}
}
```

#### 	 ③ person.js

```js
import {ADD_PERSON} from '../constant'

//初始化人的列表
const initState = [{id:'001',name:'tom',age:18}]

export default function personReducer(preState=initState,action){
	// console.log('personReducer@#@#@#');
	const {type,data} = action
	switch (type) {
		case ADD_PERSON: //若是添加一个人
			//preState.unshift(data) //此处不可以这样写，这样会导致preState被改写了，personReducer就不是纯函数了。
			return [data,...preState]
		default:
			return preState
	}
}

```



## 3、App.jsx

```jsx
import React, { Component } from 'react'
import Count from './containers/Count' //引入的Count的容器组件
import Person from './containers/Person' //引入的Person的容器组件

export default class App extends Component {
	render() {
		return (
			<div>
				<Count/>
				<hr/>
				<Person/>
			</div>
		)
	}
}

```



## 4、index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import {Provider} from 'react-redux'

ReactDOM.render(
	/* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
```



## 5、react-redux开发者工具的使用

   (1).yarn add redux-devtools-extension

   (2).store中进行配置

​     import {composeWithDevTools} from 'redux-devtools-extension'

​     const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))