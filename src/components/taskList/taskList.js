import React from 'react';
import './TaskList.css';
import PropTypes from 'prop-types';
import Task from '../Task';

function TaskList({ data, filter, setTaskCompleted, deleteTask, editTask, onTimer }) {
  TaskList.defaultProps = {
    data: [],
    deleteTask: () => {},
    setTaskCompleted: () => {},
    editTask: () => {},
  };

  TaskList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
  };

  function getTasks(data, filter) {
    let filteredElements = data.filter((item) => {
      switch (filter) {
        case 'Completed':
          return item.completed === true;
        case 'Active':
          return item.completed === false;
        default:
          return true;
      }
    });

    filteredElements = filteredElements.map((item) => {
      

      return (
        <Task
          key={item.id}
          {...item}
          setTaskCompleted={() => setTaskCompleted(data.id)}
          deleteTask={() => deleteTask(data.id)}
          editTask={(newTaskText) => editTask(data.id, newTaskText)}
          onTimer={onTimer}
        />
      );
    });

    return filteredElements;
  }

  const tasks = getTasks(data, filter);

  return (
    <section className="main">
      <ul className="todo-list">{tasks}</ul>
    </section>
  );
}

export default TaskList;
