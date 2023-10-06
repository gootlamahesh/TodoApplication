import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TodoItems from './components/TodoItems'
import './App.css'

function getTodoListFromLocalStorage() {
  const stringifiedTodoList = localStorage.getItem('todosArray')
  const parsedTodoList = JSON.parse(stringifiedTodoList)
  if (parsedTodoList === null) {
    return []
  }
  return parsedTodoList
}

const initialTodos = getTodoListFromLocalStorage()

class App extends Component {
  state = {taskInput: '', todosArray: initialTodos}

  toggleIsCompleted = id => {
    this.setState(prevState => ({
      todosArray: prevState.todosArray.map(eachTodo => {
        if (id === eachTodo.id) {
          return {...eachTodo, isCompleted: !eachTodo.isCompleted}
        }
        return eachTodo
      }),
    }))
  }

  onDeleteTodo = id => {
    this.setState(prevState => ({
      todosArray: prevState.todosArray.filter(eachTodo => eachTodo.id !== id),
    }))
  }

  onTaskAdd = event => {
    event.preventDefault()
    const {taskInput} = this.state
    if (taskInput !== '') {
      const newTask = {
        id: uuidv4(),
        taskName: taskInput,
        isCompleted: false,
      }
      const {todosArray} = this.state
      const newArray = [...todosArray, newTask]
      this.setState({todosArray: newArray, taskInput: ''})
    }
  }

  onChangeTodoBar = event => {
    this.setState({taskInput: event.target.value})
  }

  render() {
    const {taskInput, todosArray} = this.state
    localStorage.setItem('todosArray', JSON.stringify(todosArray))
    return (
      <div className="bg-container">
        <h1 className="todo-heading">To-Do</h1>
        <div className="task-container">
          <h1 className="task-heading">
            <span>Create</span> Task
          </h1>
          <form onSubmit={this.onTaskAdd}>
            <input
              type="text"
              onChange={this.onChangeTodoBar}
              placeholder="What need to be done ?"
              value={taskInput}
              className="todo-user-input"
            />
            <button type="submit" className="button">
              Add
            </button>
          </form>
        </div>
        <div className="display-todo-container">
          <h1 className="task-heading">
            <span>My</span> Tasks
          </h1>
          <ul>
            {todosArray.map(eachTodo => (
              <TodoItems
                key={eachTodo.id}
                details={eachTodo}
                toggleIsCompleted={this.toggleIsCompleted}
                onDeleteTodo={this.onDeleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
