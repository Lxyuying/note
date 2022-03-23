import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

  state = {mouse:false} //鼠标是否移入

  // 鼠标是否移入的回调
  handleMouse = (flag) => {
    return () => {
      this.setState({mouse:flag})
    }
  }

  // 删除一个todo的回调
  handleDelete = (id) => {
    if(window.confirm('确认删除吗？')) this.props.deleteTodo(id)
  }

  // 更新todo状态的回调
  handleUpdate = (id) => {
    return (e) => {
      this.props.updateTodo(id,e.target.checked)
    }
  }

  render() {

    const {mouse} = this.state
    const {id,name,done} = this.props

    return (
      <li onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
        <label>
          <input type="checkbox" checked={done} onChange={this.handleUpdate(id)} />
          <span>{name}</span>
        </label>
        <button onClick={() => this.handleDelete(id)} className="btn btn-danger" style={{display: mouse?'block':'none'}}>
          删除
        </button>
      </li>
    )
  }
}
