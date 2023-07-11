import React from 'react';
import PropTypes from 'prop-types';

import AppTitle from '../app-title/app-title';
import NewTaskForm from '../new-task-form/new-task-form';

const Header = ({ addTask }) => {
  return (
    <header className="header">
      <AppTitle />
      <NewTaskForm addTask={addTask} />
    </header>
  );
};

Header.defaultProps = {
  addTask: () => {},
};
Header.propTypes = {
  addTask: PropTypes.func,
};

export default Header;
