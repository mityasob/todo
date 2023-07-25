import React from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      minutes: '',
      seconds: '',
    };
  }

  changeInputValue = (event) => {
    this.setState({
      value: event.target.value === ' ' ? '' : event.target.value,
    });
  };

  changeInputMinutes = (event) => {
    const num = Number(event.target.value);
    if ((num >= 0 && num < 60) || num === null) {
      this.setState({
        minutes: num,
      });
    }
  };

  changeInputSeconds = (event) => {
    const num = Number(event.target.value);
    if ((num >= 0 && num < 60) || num === null) {
      this.setState({
        seconds: num,
      });
    }
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
      <form className="new-todo-form" onSubmit={this.submitForm}>
        <input
          id="value"
          className="new-todo"
          placeholder="Task"
          autoFocus
          value={this.state.value}
          onChange={this.changeInputValue}
        />
        <input
          id="minutes"
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={this.state.minutes}
          onChange={this.changeInputMinutes}
        />
        <input
          id="seconds"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={this.state.seconds}
          onChange={this.changeInputSeconds}
        />
      </form>
      // <form className="new-task-form" onSubmit={this.submitForm}>
      //   <input
      //     className="new-todo"
      //     placeholder="What needs to be done?"
      //     autoFocus
      //     value={this.state.value}
      //     onChange={this.changeInputValue}
      //   />
      //   <button type="submit" className="add-task">
      //     Add Task
      //   </button>
      // </form>
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
