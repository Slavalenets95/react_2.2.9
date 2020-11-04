import React from 'react'
import {formatDistanceToNow} from 'date-fns'
import PropTypes from 'prop-types'
import './task.css'

export default class Task extends React.Component {

    static defaultProps = {
        completed : false
    }
    
    static propTypes = {
        taskTxt : PropTypes.string,
        completed : PropTypes.bool
    }
   

    state = {
        editing: false,
        date : formatDistanceToNow(this.props.dateCreated)
    }

    updateDateCreated = () => {
        this.setState(state => {
            return {
                date : formatDistanceToNow(this.props.dateCreated, {includeSeconds : true})
            }
        })
    }
    componentDidMount = () => {
        setInterval(() => this.updateDateCreated(), 1000)
    }

    showEditInput = () => {
        this.setState(state => ({ editing : !state.editing}))
    }

    keyDownInputHandler = (e) => {
        if(e.key === 'Enter') {
            this.showEditInput(e)
            this.props.editTask(e)
        }
    }

    render() {
        const { taskTxt, deleteTask, setTaskCompleted, completed } = this.props
        const editInput = <input type='text' className='edit' placeholder='Editing task' autoFocus onKeyDown = {this.keyDownInputHandler} ></input>
    
        let classNames = completed === true ? 'completed' : ''
        if(this.state.editing) classNames += ' editing'

        return (
            <li className = { classNames }
            >
                <div className = 'view'>
                    <input className = 'toggle'
                           type = 'checkbox'
                           onClick = { setTaskCompleted }
                    />
                    <label>
                        <span className = 'description'>{ taskTxt }</span>
                        <span className = 'created'>{ this.state.date }</span>
                    </label>
                    <button className = 'icon icon-edit'
                            onClick = { this.showEditInput }
                            >
                    </button>
                    <button className = 'icon icon-destroy'
                            onClick = { deleteTask }
                    ></button>
                </div>
                { this.state.editing === true ? editInput : null }
            </li >
        )
    }
}

