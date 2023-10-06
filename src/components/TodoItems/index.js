import './index.css'

const TodoItems = props => {
  const {details, toggleIsCompleted, onDeleteTodo} = props
  const {id, taskName, isCompleted} = details
  const toggleCheckbox = () => {
    toggleIsCompleted(id)
  }

  const deleteTodo = () => {
    onDeleteTodo(id)
  }

  const ckeckedStatus = isCompleted ? 'checked' : ''

  return (
    <li className="todo-item-container">
      <input
        type="checkbox"
        id={`checkbox${id}`}
        className="checkbox-input"
        defaultChecked={isCompleted}
        onClick={toggleCheckbox}
      />
      <div className="label-container">
        <label
          htmlFor={`checkbox${id}`}
          id={`label${id}`}
          className={`label-style ${ckeckedStatus}`}
        >
          {taskName}
        </label>
        <div className="delete-icon-container">
          <button type="button" onClick={deleteTodo} className="delete-button">
            <i className="far fa-trash-alt delete-icon" />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoItems
