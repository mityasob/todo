import React from "react";
import Task from "../task/task";
import "./task-list.css";
import PropTypes from "prop-types";

const TaskList = ({ todos, onDelete, onComplete, onEdit, taskUpdate }) => {
  const taskElements = todos.map((el) => {
    return (
      <Task
        todos={el}
        key={el.id}
        onDelete={() => onDelete(el.id)}
        onComplete={() => onComplete(el.id)}
        onEdit={() => onEdit(el.id)}
        taskUpdate={taskUpdate}
      />
    );
  });

  return <ul className="todo-list">{taskElements}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  onDelete: () => {},
  onComplete: () => {},
  onEdit: () => {},
  taskUpdate: () => {},
};
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  taskUpdate: PropTypes.func,
};

export default TaskList;
