import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  changeInputValue = (event) => {
    this.setState({
      value: event.target.value === ' ' ? '' : event.target.value,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.props.addTask(this.state.value);
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <form className="new-task-form" onSubmit={this.submitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.value}
          onChange={this.changeInputValue}
        />
        <button type="submit" className="add-task">
          Add Task
        </button>
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addTask: () => {},
};
NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

export default NewTaskForm;
