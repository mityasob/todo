import React, { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addTask }) => {
  const [value, setValue] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  function changeInputValue(event) {
    setValue(event.target.value === ' ' ? '' : event.target.value);
  }

  function changeInputMinutes(event) {
    const num = Number(event.target.value);
    if ((num >= 0 && num < 60) || num === null) {
      setMinutes(event.target.value === ' ' ? '' : num);
    }
  }

  function changeInputSeconds(event) {
    const num = Number(event.target.value);
    if ((num >= 0 && num < 60) || num === null) {
      if (num >= 10) {
        setSeconds(event.target.value === ' ' ? '' : num);
      } else {
        setSeconds(event.target.value === ' ' ? '' : `0${num}`);
      }
    }
  }

  function submitForm(event) {
    event.preventDefault();
    addTask(value, minutes, seconds);
    setValue('');
    setMinutes('');
    setSeconds('');
  }

  return (
    <form className="new-todo-form" onSubmit={submitForm}>
      <input
        id="value"
        className="new-todo"
        placeholder="Task"
        autoFocus
        required
        value={value}
        onChange={changeInputValue}
      />
      <input
        id="minutes"
        className="new-todo-form__timer"
        placeholder="Min"
        required
        value={minutes}
        onChange={changeInputMinutes}
      />
      <input
        id="seconds"
        className="new-todo-form__timer"
        placeholder="Sec"
        required
        value={seconds}
        onChange={changeInputSeconds}
      />
      <button type="submit" className="create-task"></button>
    </form>
  );
};

NewTaskForm.defaultProps = {
  addTask: () => {},
};
NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

export default NewTaskForm;
