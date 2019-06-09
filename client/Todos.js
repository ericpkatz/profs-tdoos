import React, {Component} from 'react'
import axios from 'axios'
import TodoForm from './TodoForm'
import { Link } from 'react-router-dom'

export default class Todos extends Component {
  constructor () {
    super()
    this.state = {
      todos: []
    }
    this.destroy = this.destroy.bind(this);
    this.create = this.create.bind(this);
  }

  async destroy(todo){
    await axios.delete(`/api/todos/${ todo.id }`);
    //TODO - do with state managment
    this.loadData();
  }
  async create(todo){
    await axios.post('/api/todos/', todo);
    //TODO - do with state managment
    this.loadData();
  }

  componentDidMount () {
    this.loadData();
  }
  async loadData() {
    const res = await axios.get('/api/todos')
    this.setState({todos: res.data})
  }

  render () {
    const { destroy, create } = this;
    return (
      <div id='todos'>
        <TodoForm create={ create }/>
        {
          this.state.todos.map(todo => {
            return (
              <div className='todo row' key={todo.id}>
                <div className='column'>
                  <Link to={`/todos/${todo.id}`}>
                    <h3>{todo.taskName}</h3>
                  </Link>
                  <p>Assigned to: {todo.assignee}</p>
                </div>
                <div className='column'>
                  <button className='remove' onClick={ ()=> destroy(todo)}>Remove</button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
