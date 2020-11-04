import React from 'react'

import './newTaskForm.css'

export default class NewTaskForm extends React.Component {

    state = {
        newTaskTxt : ''
    }

    onInputChange = (event) => {
        this.setState( {
            newTaskTxt : event.target.value
        })
    }

    onEnterDown = (event) => {
        if(event.key === 'Enter') {
            event.target.value = ''
            this.props.createNewTask(this.state.newTaskTxt)
        }
    }
    
    render() {
        return (
            <input
                className = 'new-todo'
                placeholder = "What needs to be done?"
                autoFocus
                onChange = { this.onInputChange }
                onKeyDown = { this.onEnterDown }
            />
        )
    }
}


