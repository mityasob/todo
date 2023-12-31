import React from 'react';
import './TaskFilter.css';
import PropTypes from 'prop-types';

import TaskFilterElement from '../TaskFilterElement';

class TaskFilter extends React.Component {
  render() {
    const filterElements = this.props.buttons.map((el) => {
      return (
        <TaskFilterElement
          key={el.id}
          value={el.value}
          isSelected={el.selected}
          selectedButton={() => this.props.selectedButton(el.id)}
        />
      );
    });

    return <ul className="filters">{filterElements}</ul>;
  }
}

TaskFilter.defaultProps = {
  buttons: [],
  selectedButton: () => {},
};
TaskFilter.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object),
  selectedButton: PropTypes.func,
};

export default TaskFilter;
