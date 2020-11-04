import React from 'react'
import PropTypes from 'prop-types'


const TaskFilter = (props) =>  {

    TaskFilter.propTypes = {
        text : PropTypes.string,
        filter : PropTypes.string
    }

    const { text, filter } = props

    return (
        <button className = {filter === text.toLowerCase() ? 'selected' : null}>{text}</button>
    )
}



export default TaskFilter