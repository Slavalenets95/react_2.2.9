import React from 'react';
import './TaskList.css';
import PropTypes from 'prop-types';
import Task from '../Task';

function TaskList({ data, filter, setTaskCompleted, deleteTask, editTask }) {
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
      const { id, ...data } = item;

      return (
        <Task
          key={id}
          {...data}
          setTaskCompleted={() => setTaskCompleted(id)}
          deleteTask={() => deleteTask(id)}
          editTask={(newTaskText) => editTask(id, newTaskText)}
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
