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
        minutes: event.target.value === ' ' ? '' : num,
      });
    }
  };

  changeInputSeconds = (event) => {
    const num = Number(event.target.value);
    if ((num >= 0 && num < 60) || num === null) {
      if (num >= 10) {
        this.setState({
          seconds: event.target.value === ' ' ? '' : num,
        });
      } else {
        this.setState({
          seconds: event.target.value === ' ' ? '' : `0${num}`,
        });
      }
    }
  };

  submitForm = (event) => {
    event.preventDefault();
    this.props.addTask(this.state.value, this.state.minutes, this.state.seconds);
    this.setState({
      value: '',
      minutes: '',
      seconds: '',
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
          required
          value={this.state.value}
          onChange={this.changeInputValue}
        />
        <input
          id="minutes"
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          required
          value={this.state.minutes}
          onChange={this.changeInputMinutes}
        />
        <input
          id="seconds"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          required
          value={this.state.seconds}
          onChange={this.changeInputSeconds}
        />
        <button type="submit" className="create-task"></button>
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
