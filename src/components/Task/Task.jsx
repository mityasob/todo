import React, { useState } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Timer from '../Timer';

const Task = ({ todos, onComplete, onEdit, onDelete, taskUpdate }) => {
  const [inputValue, setInputValue] = useState(todos.value);

  function submitForm(event) {
    event.preventDefault();
    taskUpdate(todos.id, inputValue);
    setInputValue(inputValue);
  }

  function changeInput(event) {
    setInputValue(event.target.value === ' ' ? '' : event.target.value);
  }

  const toggleComplete = todos.completed ? 'completed' : '';

  const toggleEdit = todos.edited ? 'editing' : '';

  const isVisible = {
    display: todos.edited ? 'flex' : 'none',
  };

  const isDisplayed = {
    display: todos.display ? 'list-item' : 'none',
  };

  return (
    <li className={`${toggleComplete} ${toggleEdit}`} style={isDisplayed}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onComplete} checked={todos.completed} />
        <div className="task-details">
          <span className="title" onClick={onComplete}>
            {todos.value}
          </span>
          <Timer todos={todos} />
          <span className="description">
            {formatDistanceToNow(todos.date, {
              includeSeconds: true,
            })}
          </span>
        </div>
        <button type="button" title="Edit Task" className="icon icon-edit" onClick={onEdit}></button>
        <button type="button" title="Delete Task" className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {todos.edited && (
        <form className="edit-task-form" style={isVisible} onSubmit={submitForm}>
          <input
            type="text"
            className="edit"
            autoFocus={todos.edited}
            value={inputValue}
            onChange={changeInput}
          ></input>
          <button type="submit" className="add-task">
            Save Task
          </button>
        </form>
      )}
    </li>
  );
};

Task.defaultProps = {
  todos: {},
  onComplete: () => {},
  onEdit: () => {},
  onDelete: () => {},
  taskUpdate: () => {},
};
Task.propTypes = {
  todos: PropTypes.object,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  taskUpdate: PropTypes.func,
};

export default Task;
