import React from "react";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";
import "./main.css";
import PropTypes from "prop-types";

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
      <TaskList
        todos={todos}
        onDelete={onDelete}
        onComplete={onComplete}
        onEdit={onEdit}
        taskUpdate={taskUpdate}
      />
      <Footer
        buttons={buttons}
        selectedButton={selectedButton}
        clearCompleted={clearCompleted}
        todoCount={todoCount}
      />
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
