import React from 'react';
import PropTypes from 'prop-types';

import TaskList from '../TaskList';
import Footer from '../Footer';

import './Main.css';

const Main = ({
  todos,
  buttons,
  onDelete,
  onComplete,
  onEdit,
  selectedButton,
  clearCompleted,
  todoCount,
  taskUpdate,
}) => {
  return (
    <section className="main">
      <TaskList todos={todos} onDelete={onDelete} onComplete={onComplete} onEdit={onEdit} taskUpdate={taskUpdate} />
      <Footer buttons={buttons} selectedButton={selectedButton} clearCompleted={clearCompleted} todoCount={todoCount} />
    </section>
  );
};

Main.defaultProps = {
  todos: [],
  buttons: [],
  onDelete: () => {},
  onComplete: () => {},
  onEdit: () => {},
  selectedButton: () => {},
  clearCompleted: () => {},
  todoCount: 0,
  taskUpdate: () => {},
};
Main.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  buttons: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  selectedButton: PropTypes.func,
  clearCompleted: PropTypes.func,
  todoCount: PropTypes.number,
  taskUpdate: PropTypes.func,
};

export default Main;
