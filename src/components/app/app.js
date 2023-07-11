import React from "react";
import Header from "../header/header";
import Main from "../main/main";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.startId = 1;

    this.state = {
      taskArr: [
        this.createTask("Open one eye"),
        this.createTask("Open second eye"),
        this.createTask("Drink coffee"),
      ],
      buttonsArr: [
        { id: 1, value: "All", selected: false },
        { id: 2, value: "Active", selected: false },
        { id: 3, value: "Completed", selected: false },
      ],
      itemsLeft: 3,
    };
  }

  createTask = (valueText) => ({
    id: this.startId++,
    value: valueText,
    completed: false,
    edited: false,
    display: true,
    date: new Date(),
  });

  deleteTask = (id) => {
    this.setState(({ taskArr, itemsLeft }) => {
      const index = taskArr.findIndex((el) => el.id === id);
      const newTaskArr = [
        ...taskArr.slice(0, index),
        ...taskArr.slice(index + 1),
      ];
      let itemsCount;
      if (!taskArr[index].completed) {
        itemsCount = Number(itemsLeft) - 1;
      } else {
        itemsCount = Number(itemsLeft);
      }
      return {
        taskArr: newTaskArr,
        itemsLeft: itemsCount,
      };
    });
  };

  addTask = (inputValue) => {
    this.setState(({ taskArr, itemsLeft }) => {
      if (inputValue) {
        const newTaskArr = [...taskArr, this.createTask(inputValue)];
        const itemsCount = Number(itemsLeft) + 1;
        return {
          taskArr: newTaskArr,
          itemsLeft: itemsCount,
        };
      }
    });
  };

  taskComplete = (id) => {
    this.setState(({ taskArr, itemsLeft }) => {
      const index = taskArr.findIndex((el) => el.id === id);
      const targetItem = taskArr[index];
      const completedItem = { ...targetItem, completed: !targetItem.completed };
      const newTaskArr = [
        ...taskArr.slice(0, index),
        completedItem,
        ...taskArr.slice(index + 1),
      ];
      let itemsCount;
      if (targetItem.completed) {
        itemsCount = Number(itemsLeft) + 1;
      } else {
        itemsCount = Number(itemsLeft) - 1;
      }
      return {
        taskArr: newTaskArr,
        itemsLeft: itemsCount,
      };
    });
  };

  taskEditing = (id) => {
    this.setState(({ taskArr }) => {
      const index = taskArr.findIndex((el) => el.id === id);
      const targetItem = taskArr[index];
      const editingItem = { ...targetItem, edited: !targetItem.edited };
      const newTaskArr = [
        ...taskArr.slice(0, index),
        editingItem,
        ...taskArr.slice(index + 1),
      ];
      return {
        taskArr: newTaskArr,
      };
    });
  };

  handleButton = (id) => {
    this.setState(({ taskArr, buttonsArr }) => {
      const index = buttonsArr.findIndex((el) => el.id === id);
      const targetItem = buttonsArr[index];
      const selectedButton = { ...targetItem, selected: true };
      const before = [];
      [...buttonsArr.slice(0, index)].forEach((el) => {
        if (selectedButton.selected) {
          el.selected = false;
          before.push(el);
        } else before.push(el);
      });
      const after = [];
      [...buttonsArr.slice(index + 1)].forEach((el) => {
        if (selectedButton.selected) {
          el.selected = false;
          after.push(el);
        } else after.push(el);
      });
      const newButtonsArr = [...before, selectedButton, ...after];
      const newTaskArr = [];
      if (selectedButton.value === "Completed") {
        taskArr.forEach((el) => {
          if (!el.completed) {
            el.display = !selectedButton.selected;
            newTaskArr.push(el);
          } else {
            el.display = selectedButton.selected;
            newTaskArr.push(el);
          }
        });
      }
      if (selectedButton.value === "Active") {
        taskArr.forEach((el) => {
          if (el.completed) {
            el.display = !selectedButton.selected;
            newTaskArr.push(el);
          } else {
            el.display = selectedButton.selected;
            newTaskArr.push(el);
          }
        });
      }
      if (selectedButton.value === "All") {
        taskArr.forEach((el) => {
          el.display = selectedButton.selected;
          newTaskArr.push(el);
        });
      }
      return {
        taskArr: newTaskArr,
        buttonsArr: newButtonsArr,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ taskArr }) => {
      const newTaskArr = [];
      taskArr.forEach((el) => {
        if (!el.completed) {
          newTaskArr.push(el);
        }
      });
      return {
        taskArr: newTaskArr,
      };
    });
  };

  taskUpdate = (id, inputValue) => {
    this.setState(({ taskArr }) => {
      if (inputValue) {
        const index = taskArr.findIndex((el) => el.id === id);
        const targetItem = taskArr[index];
        const editingItem = {
          ...targetItem,
          value: inputValue,
          edited: false,
          display: true,
        };
        const newTaskArr = [
          ...taskArr.slice(0, index),
          editingItem,
          ...taskArr.slice(index + 1),
        ];
        return {
          taskArr: newTaskArr,
        };
      }
    });
  };

  render() {
    return (
      <section className='todoapp'>
        <Header addTask={this.addTask} />
        <Main
          todos={this.state.taskArr}
          buttons={this.state.buttonsArr}
          onDelete={this.deleteTask}
          onComplete={this.taskComplete}
          onEdit={this.taskEditing}
          selectedButton={this.handleButton}
          clearCompleted={this.clearCompleted}
          todoCount={this.state.itemsLeft}
          taskUpdate={this.taskUpdate}
        />
      </section>
    );
  }
}

export default App;
