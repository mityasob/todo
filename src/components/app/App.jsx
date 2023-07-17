import React from 'react';

import Header from '../Header';
import Main from '../Main';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.startId = 1;

    this.state = {
      taskArray: [this.createTask('Open one eye'), this.createTask('Open second eye'), this.createTask('Drink coffee')],
      buttonsArray: [
        { id: 1, value: 'All', selected: true },
        { id: 2, value: 'Active', selected: false },
        { id: 3, value: 'Completed', selected: false },
      ],
      itemsLeft: 3,
    };
  }

  createTask = (valueText) => ({
    id: this.startId++,
    value: valueText,
    completed: false,
    checked: false,
    edited: false,
    display: true,
    date: new Date(),
  });

  deleteTask = (id) => {
    const { taskArray, itemsLeft } = this.state;
    const index = taskArray.findIndex((el) => el.id === id);
    const newtaskArray = [...taskArray.slice(0, index), ...taskArray.slice(index + 1)];
    let itemsCount;
    if (!taskArray[index].completed) {
      itemsCount = Number(itemsLeft) - 1;
    } else {
      itemsCount = Number(itemsLeft);
    }
    this.setState(() => {
      return {
        taskArray: newtaskArray,
        itemsLeft: itemsCount,
      };
    });
  };

  addTask = (inputValue) => {
    const { taskArray, itemsLeft } = this.state;
    let newtaskArray;
    let itemsCount;
    if (inputValue) {
      newtaskArray = [...taskArray, this.createTask(inputValue)];
      itemsCount = Number(itemsLeft) + 1;
    } else return;
    this.setState(() => {
      return {
        taskArray: newtaskArray,
        itemsLeft: itemsCount,
      };
    });
  };

  taskComplete = (id) => {
    const { taskArray, itemsLeft } = this.state;
    const index = taskArray.findIndex((el) => el.id === id);
    const targetItem = taskArray[index];
    const completedItem = { ...targetItem, completed: !targetItem.completed, checked: !targetItem.checked };
    const newtaskArray = [...taskArray.slice(0, index), completedItem, ...taskArray.slice(index + 1)];
    let itemsCount;
    if (targetItem.completed) {
      itemsCount = Number(itemsLeft) + 1;
    } else {
      itemsCount = Number(itemsLeft) - 1;
    }
    this.setState(() => {
      return {
        taskArray: newtaskArray,
        itemsLeft: itemsCount,
      };
    });
  };

  taskEditing = (id) => {
    const { taskArray } = this.state;
    const index = taskArray.findIndex((el) => el.id === id);
    const targetItem = taskArray[index];
    const editingItem = { ...targetItem, edited: !targetItem.edited };
    const newtaskArray = [...taskArray.slice(0, index), editingItem, ...taskArray.slice(index + 1)];
    this.setState(() => {
      return {
        taskArray: newtaskArray,
      };
    });
  };

  handleButton = (id) => {
    const { taskArray, buttonsArray } = this.state;
    const index = buttonsArray.findIndex((el) => el.id === id);
    const targetItem = buttonsArray[index];
    const selectedButton = { ...targetItem, selected: true };
    const before = [];
    [...buttonsArray.slice(0, index)].forEach((el) => {
      el.selected = !selectedButton;
      before.push(el);
    });
    const after = [];
    [...buttonsArray.slice(index + 1)].forEach((el) => {
      el.selected = !selectedButton;
      after.push(el);
    });
    const newbuttonsArray = [...before, selectedButton, ...after];
    const newtaskArray = [];
    if (selectedButton.value === 'Completed') {
      taskArray.forEach((el) => {
        el.display = el.completed ? selectedButton.selected : !selectedButton.selected;
        newtaskArray.push(el);
      });
    }
    if (selectedButton.value === 'Active') {
      taskArray.forEach((el) => {
        el.display = el.completed ? !selectedButton.selected : selectedButton.selected;
        newtaskArray.push(el);
      });
    }
    if (selectedButton.value === 'All') {
      taskArray.forEach((el) => {
        el.display = selectedButton.selected;
        newtaskArray.push(el);
      });
    }
    this.setState(() => {
      return {
        taskArray: newtaskArray,
        buttonsArray: newbuttonsArray,
      };
    });
  };

  clearCompleted = () => {
    const { taskArray } = this.state;
    const newtaskArray = [];
    taskArray.forEach((el) => {
      if (!el.completed) {
        newtaskArray.push(el);
      }
    });
    this.setState(() => {
      return {
        taskArray: newtaskArray,
      };
    });
  };

  taskUpdate = (id, inputValue) => {
    const { taskArray } = this.state;
    let newtaskArray;
    if (inputValue) {
      const index = taskArray.findIndex((el) => el.id === id);
      const targetItem = taskArray[index];
      const editingItem = {
        ...targetItem,
        value: inputValue,
        edited: false,
        display: true,
      };
      newtaskArray = [...taskArray.slice(0, index), editingItem, ...taskArray.slice(index + 1)];
    } else return;
    this.setState(() => {
      return {
        taskArray: newtaskArray,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <Main
          todos={this.state.taskArray}
          buttons={this.state.buttonsArray}
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
