import React from 'react'
import './Header.css'

import NewTaskForm from '../NewTaskForm/'

function Header({createNewTask}) {

    return (
        <header className = "header">
            <h1>todos</h1>
            <NewTaskForm createNewTask = {(txt) => createNewTask(txt)}/>
        </header>
    )
}

export default Header