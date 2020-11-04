import React from 'react'
import './Footer.css'
import PropTypes from 'prop-types'

export default class Footer extends React.Component {
    
    static defaultProps = {
        clearCompletedTasks : () => {}
    }

    static propTypes = {
        completedCount : PropTypes.number,
        clearCompletedTasks : PropTypes.func
    }

    state = {
        selected : 'All'
    }
 
    handleClick = (e) => {
        this.props.setFilter(e.target.textContent)
        this.setState({selected : e.target.textContent})
    }

    render() {
        const {completedCount, clearCompletedTasks} = this.props
        return (
            <footer className = "footer">
                <span className = "todo-count">{completedCount} items left</span>
                <ul className = "filters"
                    onClick = {this.handleClick}
                >
                    <li>
                        <button className = {this.state.selected === 'All' ? 'selected' : null}>All</button>
                    </li>
                    <li>
                        <button className = {this.state.selected === 'Active' ? 'selected' : null}>Active</button>
                    </li>
                    <li>
                        <button className = {this.state.selected === 'Completed' ? 'selected' : null}>Completed</button>
                    </li>
                </ul>
                <button className = "clear-completed" onClick = {clearCompletedTasks}>Clear completed</button>
          </footer>
        )
    }
}

