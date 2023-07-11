import React from "react";
import "./task-filter.css";
import TaskFilterElement from "../task-filter-element/task-filter-element";
import PropTypes from "prop-types";

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
