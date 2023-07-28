import React from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Timer from '../Timer';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.todos.value,
      focus: false,
    };
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.taskUpdate(this.props.todos.id, this.state.inputValue);
    this.setState({
      inputValue: this.state.inputValue,
    });
  };

  changeInput = (event) => {
    this.setState({
      inputValue: event.target.value === ' ' ? '' : event.target.value,
    });
  };

  render() {
    const toggleComplete = this.props.todos.completed ? 'completed' : '';

    const toggleEdit = this.props.todos.edited ? 'editing' : '';

    const isVisible = {
      display: this.props.todos.edited ? 'flex' : 'none',
    };

    const isDisplayed = {
      display: this.props.todos.display ? 'list-item' : 'none',
    };

    return (
      <li className={`${toggleComplete} ${toggleEdit}`} style={isDisplayed}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this.props.onComplete}
            checked={this.props.todos.completed}
          />
          <div className="task-details">
            <span className="title" onClick={this.props.onComplete}>
              {this.props.todos.value}
            </span>
            <Timer todos={this.props.todos} />
            <span className="description">
              {formatDistanceToNow(this.props.todos.date, {
                includeSeconds: true,
              })}
            </span>
          </div>
          <button type="button" title="Edit Task" className="icon icon-edit" onClick={this.props.onEdit}></button>
          <button
            type="button"
            title="Delete Task"
            className="icon icon-destroy"
            onClick={this.props.onDelete}
          ></button>
        </div>
        {this.props.todos.edited && (
          <form className="edit-task-form" style={isVisible} onSubmit={this.submitForm}>
            <input
              type="text"
              className="edit"
              autoFocus={this.props.todos.edited}
              value={this.state.inputValue}
              onChange={this.changeInput}
            ></input>
            <button type="submit" className="add-task">
              Save Task
            </button>
          </form>
        )}
      </li>
    );
  }
}

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
