import React from "react";
import TaskFilter from "../task-filter/task-filter";
import "./footer.css";
import PropTypes from "prop-types";

const Footer = ({ buttons, selectedButton, clearCompleted, todoCount }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter buttons={buttons} selectedButton={selectedButton} />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  buttons: [],
  selectedButton: () => {},
  clearCompleted: () => {},
  todoCount: 0,
};
Footer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object),
  selectedButton: PropTypes.func,
  clearCompleted: PropTypes.func,
  todoCount: PropTypes.number,
};

export default Footer;
