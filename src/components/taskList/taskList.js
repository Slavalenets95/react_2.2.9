import React from 'react'
import PropTypes from 'prop-types'
import Task from '../task/task'
import './taskList.css'

function TaskList(props) {
    const { tasksData, filter } = props
    const { deleteTask, setTaskCompleted, editTask } = props //func
    
    TaskList.defaultProps = {
        tasksData : [],
        deleteTask : () => {},
        setTaskCompleted : () => {},
        editTask : () => {}
    }

    TaskList.propTypes = {
        tasksData : PropTypes.arrayOf(PropTypes.object)
    }

    function getFilteredElements(data, filter) {
        let filteredElements = data.filter(item => {
            switch (filter) {
                case 'completed':
                    return item.completed === true
                case 'active':
                    return item.completed === false
                default:
                    return true
            }
        })
    
        filteredElements = filteredElements.map(item => {
            const { id, ...data } = item
    
            return (
                <Task key = {id} 
                      {...data} 
                      deleteTask = {() => deleteTask(id)}
                      setTaskCompleted={() => setTaskCompleted(id)}
                      editTask = {(e) => editTask(e.target.value, id)}
                />
            )
        })
    
        return filteredElements
    }

    const taskListLiElements = getFilteredElements(tasksData, filter)

    return (
        <ul className='todo-list'>
            { taskListLiElements}
        </ul>
    ) 

}


export default TaskList

