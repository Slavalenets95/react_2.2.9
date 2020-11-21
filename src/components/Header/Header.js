import React from 'react';
import './Header.css';

import NewTaskForm from '../NewTaskForm/';

function Header({ createNewTask }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm createNewTask={(txt, timer) => createNewTask(txt, timer)} />
    </header>
  );
}

export default Header;
