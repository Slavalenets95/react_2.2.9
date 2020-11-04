import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

class App extends React.Component {
  taskId = 1;

  state = {
    tasksData: [],
    filter: 'All',
  };

  createNewTasksDataElement = (taskText) => ({
    taskText: taskText,
    date: new Date(),
    completed: false,
    id: this.taskId++,
  });

  createNewTask = (taskText) => {
    this.setState(({ tasksData }) => ({
      tasksData: [...tasksData, this.createNewTasksDataElement(taskText)],
    }));
  };

  setTaskCompleted = (taskId) => {
    this.setState(({ tasksData }) => {
      const index = tasksData.findIndex((item) => taskId === item.id);
      const completedTask = {
        ...tasksData[index],
        completed: !tasksData[index].completed,
      };
      return {
        tasksData: [...tasksData.slice(0, index), completedTask, ...tasksData.slice(index + 1)],
      };
    });
  };

  editTask = (taskId, newTaskText) => {
    this.setState(({ tasksData }) => {
      const index = tasksData.findIndex((item) => taskId === item.id);
      const newTask = { ...tasksData[index], taskText: newTaskText };
      return {
        tasksData: [...tasksData.slice(0, index), newTask, ...tasksData.slice(index + 1)],
      };
    });
  };

  deleteTask = (taskId) => {
    this.setState(({ tasksData }) => {
      const index = tasksData.findIndex((item) => taskId === item.id);
      return {
        tasksData: [...tasksData.slice(0, index), ...tasksData.slice(index + 1)],
      };
    });
  };

  setFilter = (filter) => {
    this.setState({ filter: filter });
  };

  clearCompletedTasks = () => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: tasksData.filter((item) => item.completed === false),
      };
    });
  };

  render() {
    return (
      <>
        <Header createNewTask={this.createNewTask} />
        <TaskList
          data={this.state.tasksData}
          setTaskCompleted={this.setTaskCompleted}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          filter={this.state.filter}
        />
        <Footer
          completedCount={this.state.tasksData.filter((item) => item.completed === false).length}
          clearCompletedTasks={this.clearCompletedTasks}
          setFilter={this.setFilter}
        />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
