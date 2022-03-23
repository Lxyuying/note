import { Component } from 'react'
import './App.css'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'



export default class App extends Component {

  // 初始化列表清单
	state = {todos:[
		{id:'001',name:'吃饭',done:true},
		{id:'002',name:'睡觉',done:true},
		{id:'003',name:'打代码',done:false},
		{id:'004',name:'逛街',done:false}
	]}

  // 增
  addTodo = (todoObj) => {
    const {todos} = this.state
    const newTodos = [todoObj,...todos]
    this.setState({todos:newTodos})
  }

  // 删
  deleteTodo = (id) => {
    const {todos} = this.state
    const newTodos = todos.filter((e)=>{
      return e.id !== id
    })
    this.setState({todos:newTodos})
  }

  // 改
  updateTodo = (id,done) => {
    const {todos} = this.state
    const newTodos = todos.map((todoObj) => {
      if(todoObj.id === id) return {...todoObj,done}
      else return todoObj
    })
    this.setState({todos:newTodos})
  }

  // 全选
  checkAllTodo = (done) => {
    const {todos} = this.state
    const newTodos = todos.map((todoObj) => {
      return {...todoObj,done}
    })
    this.setState({todos:newTodos})
  }

  // 清除已完成
  clearAllDone = () => {
    const {todos} = this.state
    const newTodos = todos.filter((todoObj) => {
      return !todoObj.done
    })
    this.setState({todos:newTodos})
  }

  render() {
    const {todos} = this.state
    return (
			<div className="todo-container">
				<div className="todo-wrap">
          <Header addTodo={this.addTodo}/>
          <List todos={todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}/>
          <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
        </div>
      </div>
    )
  }
}
