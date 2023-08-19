import React, { useState } from 'react';

import Header from '../Header';
import Main from '../Main';
import './App.css';

const App = () => {
  let startId = 1;

  function createTask(valueText, valueMinutes, valueSeconds) {
    return {
      id: startId++,
      value: valueText,
      minutes: valueMinutes,
      seconds: valueSeconds,
      completed: false,
      checked: false,
      edited: false,
      display: true,
      date: new Date(),
    };
  }

  const [taskArray, setTaskArray] = useState([
    createTask('Open one eye', 0, 10),
    createTask('Open second eye', 1, 15),
    createTask('Drink coffee', 23, 19),
  ]);
  const [buttonsArray, setButtonsArray] = useState([
    { id: 1, value: 'All', selected: true },
    { id: 2, value: 'Active', selected: false },
    { id: 3, value: 'Completed', selected: false },
  ]);
  const [itemsLeft, setItemsLeft] = useState(3);

  function deleteTask(id) {
    const index = taskArray.findIndex((el) => el.id === id);
    const newtaskArray = [...taskArray.slice(0, index), ...taskArray.slice(index + 1)];
    let itemsCount;
    if (!taskArray[index].completed) {
      itemsCount = Number(itemsLeft) - 1;
    } else {
      itemsCount = Number(itemsLeft);
    }
    setTaskArray(newtaskArray);
    setItemsLeft(itemsCount);
  }

  function addTask(inputValue, inputMinutes, inputSeconds) {
    let newtaskArray;
    let itemsCount;
    if (inputValue && (inputMinutes || inputSeconds)) {
      newtaskArray = [...taskArray, createTask(inputValue, inputMinutes, inputSeconds)];
      itemsCount = Number(itemsLeft) + 1;
    } else return;
    setTaskArray(newtaskArray);
    setItemsLeft(itemsCount);
  }

  function taskComplete(id) {
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
    setTaskArray(newtaskArray);
    setItemsLeft(itemsCount);
  }

  function taskEditing(id) {
    const index = taskArray.findIndex((el) => el.id === id);
    const targetItem = taskArray[index];
    const editingItem = { ...targetItem, edited: !targetItem.edited };
    const newtaskArray = [...taskArray.slice(0, index), editingItem, ...taskArray.slice(index + 1)];
    setTaskArray(newtaskArray);
  }

  function handleButton(id) {
    const targetIndex = buttonsArray.findIndex((el) => el.id === id);
    const targetItem = buttonsArray[targetIndex];
    const newbuttonsArray = buttonsArray.slice();
    newbuttonsArray.forEach((el, index) => {
      if (index === targetIndex) {
        el.selected = true;
      } else {
        el.selected = false;
      }
    });
    const newtaskArray = taskArray.slice();
    newtaskArray.forEach((el) => {
      if ((targetItem.value === 'Completed' && !el.completed) || (targetItem.value === 'Active' && el.completed)) {
        el.display = false;
      } else {
        el.display = true;
      }
    });
    setTaskArray(newtaskArray);
    setButtonsArray(newbuttonsArray);
  }

  function clearCompleted() {
    const newtaskArray = [];
    taskArray.forEach((el) => {
      if (!el.completed) {
        newtaskArray.push(el);
      }
    });
    setTaskArray(newtaskArray);
  }

  function taskUpdate(id, inputValue) {
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
    setTaskArray(newtaskArray);
  }

  return (
    <section className="todoapp">
      <Header addTask={addTask} />
      <Main
        todos={taskArray}
        buttons={buttonsArray}
        onDelete={deleteTask}
        onComplete={taskComplete}
        onEdit={taskEditing}
        selectedButton={handleButton}
        clearCompleted={clearCompleted}
        todoCount={itemsLeft}
        taskUpdate={taskUpdate}
      />
    </section>
  );
};

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.startId = 1;

//     this.state = {
//       taskArray: [
//         this.createTask('Open one eye', 0, 10),
//         this.createTask('Open second eye', 1, 15),
//         this.createTask('Drink coffee', 23, 19),
//       ],
//       buttonsArray: [
//         { id: 1, value: 'All', selected: true },
//         { id: 2, value: 'Active', selected: false },
//         { id: 3, value: 'Completed', selected: false },
//       ],
//       itemsLeft: 3,
//     };
//   }

//   createTask = (valueText, valueMinutes, valueSeconds) => ({
//     id: this.startId++,
//     value: valueText,
//     minutes: valueMinutes,
//     seconds: valueSeconds,
//     completed: false,
//     checked: false,
//     edited: false,
//     display: true,
//     date: new Date(),
//   });

//   deleteTask = (id) => {
//     const { taskArray, itemsLeft } = this.state;
//     const index = taskArray.findIndex((el) => el.id === id);
//     const newtaskArray = [...taskArray.slice(0, index), ...taskArray.slice(index + 1)];
//     let itemsCount;
//     if (!taskArray[index].completed) {
//       itemsCount = Number(itemsLeft) - 1;
//     } else {
//       itemsCount = Number(itemsLeft);
//     }
//     this.setState(() => {
//       return {
//         taskArray: newtaskArray,
//         itemsLeft: itemsCount,
//       };
//     });
//   };

//   addTask = (inputValue, inputMinutes, inputSeconds) => {
//     const { taskArray, itemsLeft } = this.state;
//     let newtaskArray;
//     let itemsCount;
//     if (inputValue && (inputMinutes || inputSeconds)) {
//       newtaskArray = [...taskArray, this.createTask(inputValue, inputMinutes, inputSeconds)];
//       itemsCount = Number(itemsLeft) + 1;
//     } else return;
//     this.setState(() => {
//       return {
//         taskArray: newtaskArray,
//         itemsLeft: itemsCount,
//       };
//     });
//   };

//   taskComplete = (id) => {
//     const { taskArray, itemsLeft } = this.state;
//     const index = taskArray.findIndex((el) => el.id === id);
//     const targetItem = taskArray[index];
//     const completedItem = { ...targetItem, completed: !targetItem.completed, checked: !targetItem.checked };
//     const newtaskArray = [...taskArray.slice(0, index), completedItem, ...taskArray.slice(index + 1)];
//     let itemsCount;
//     if (targetItem.completed) {
//       itemsCount = Number(itemsLeft) + 1;
//     } else {
//       itemsCount = Number(itemsLeft) - 1;
//     }
//     this.setState(() => {
//       return {
//         taskArray: newtaskArray,
//         itemsLeft: itemsCount,
//       };
//     });
//   };

//   taskEditing = (id) => {
//     const { taskArray } = this.state;
//     const index = taskArray.findIndex((el) => el.id === id);
//     const targetItem = taskArray[index];
//     const editingItem = { ...targetItem, edited: !targetItem.edited };
//     const newtaskArray = [...taskArray.slice(0, index), editingItem, ...taskArray.slice(index + 1)];
//     this.setState(() => {
//       return {
//         taskArray: newtaskArray,
//       };
//     });
//   };

//   handleButton = (id) => {
//     const { taskArray, buttonsArray } = this.state;
//     const targetIndex = buttonsArray.findIndex((el) => el.id === id);
//     const targetItem = buttonsArray[targetIndex];
//     const newbuttonsArray = buttonsArray.slice();
//     newbuttonsArray.forEach((el, index) => {
//       if (index === targetIndex) {
//         el.selected = true;
//       } else {
//         el.selected = false;
//       }
//     });
//     const newtaskArray = taskArray.slice();
//     newtaskArray.forEach((el) => {
//       if ((targetItem.value === 'Completed' && !el.completed) || (targetItem.value === 'Active' && el.completed)) {
//         el.display = false;
//       } else {
//         el.display = true;
//       }
//     });
//     this.setState(() => {
//       return {
//         taskArray: newtaskArray,
//         buttonsArray: newbuttonsArray,
//       };
//     });
//   };

//   clearCompleted = () => {
//     const { taskArray } = this.state;
//     const newtaskArray = [];
//     taskArray.forEach((el) => {
//       if (!el.completed) {
//         newtaskArray.push(el);
//       }
//     });
//     this.setState(() => {
//       return {
//         taskArray: newtaskArray,
//       };
//     });
//   };

//   taskUpdate = (id, inputValue) => {
//     const { taskArray } = this.state;
//     let newtaskArray;
//     if (inputValue) {
//       const index = taskArray.findIndex((el) => el.id === id);
//       const targetItem = taskArray[index];
//       const editingItem = {
//         ...targetItem,
//         value: inputValue,
//         edited: false,
//         display: true,
//       };
//       newtaskArray = [...taskArray.slice(0, index), editingItem, ...taskArray.slice(index + 1)];
//     } else return;
//     this.setState(() => {
//       return {
//         taskArray: newtaskArray,
//       };
//     });
//   };

//   render() {
//     return (
//       <section className="todoapp">
//         <Header addTask={this.addTask} />
//         <Main
//           todos={this.state.taskArray}
//           buttons={this.state.buttonsArray}
//           onDelete={this.deleteTask}
//           onComplete={this.taskComplete}
//           onEdit={this.taskEditing}
//           selectedButton={this.handleButton}
//           clearCompleted={this.clearCompleted}
//           todoCount={this.state.itemsLeft}
//           taskUpdate={this.taskUpdate}
//         />
//       </section>
//     );
//   }
// }

export default App;
