import React from 'react'
import ReactDOM from 'react-dom'


import Footer from './components/footer'
import NewTaskForm from './components/newTaskForm'
import TaskList from './components/taskList'

class App extends React.Component {
  tasksDataId = 1
  

  state = {
    tasksData : [ ],
    footerData : [
      {text: 'All', id : 1},
      {text: 'Active', id : 2},
      {text: 'Completed', id : 3},
    ],
    filter : 'all'
  }

  createNewTasksDataElement = (taskTxt) => {
    return {
      taskTxt : taskTxt, dateCreated : new Date(), completed : false, id : this.tasksDataId++
    }
  }

  deleteAllCompletedTask = () => {
    this.setState(state => {
      const newState = state.tasksData.filter(item => item.completed === false)
      return {
        tasksData : newState
      }
    })
  }

  editTask = (newTaskTxt, id) => {
    const index = this.state.tasksData.findIndex(item => id === item.id)
    this.setState(state => {
      const newTask = { ...state.tasksData[index], taskTxt : newTaskTxt }
      return {
        tasksData : [...state.tasksData.slice(0, index), newTask, ...state.tasksData.slice(index + 1)]
      }
    })
  }

  onActiveFilter = () => {
    this.setState({ filter : 'active'})
  }

  onCompletedFilter = () => {
    this.setState({ filter : 'completed'})
  }

  notFilter = () => {
    this.setState({ filter : 'all' })
  }

  setTaskCompleted = (id) => {
    this.setState(state => {
      const index = state.tasksData.findIndex(item => item.id === id)
      const newElement = {...state.tasksData[index], completed : !state.tasksData[index].completed}
      return {
        tasksData : [...state.tasksData.slice(0, index), newElement, ...state.tasksData.slice(index + 1)]
      }
    })
  }

  deleteTask = (id) => {
    this.setState(state => {
      const index = state.tasksData.findIndex(item => item.id === id)
      return {
        tasksData : [...state.tasksData.slice(0, index), ...state.tasksData.slice(index + 1)]
      }
    })
  }
  
  createNewTask = (taskTxt) => {
      this.setState(state => {
        const newTask = this.createNewTasksDataElement(taskTxt)
        this.tasksDataId = ++this.tasksDataId

        return {
          tasksData : [ ...state.tasksData, newTask]
        }
      })
  }

  render() {
    const notCompletedCount = this.state.tasksData.filter(item => item.completed === false).length
    console.log(notCompletedCount)
    return (
      <section className = 'todoapp'>
        <header className = 'header'>
          <h1>todos</h1>
          <NewTaskForm
            createNewTask = { this.createNewTask }  
          />
        </header>
        <section className = 'main'>
          <TaskList tasksData = { this.state.tasksData }
                    filter = { this.state.filter }
                    deleteTask = { this.deleteTask }
                    setTaskCompleted = { this.setTaskCompleted }
                    editTask = { this.editTask }
                    />
        </section>
  
        <Footer footerData={this.state.footerData}
                filter = {this.state.filter}
                onActiveFilter = {this.onActiveFilter}
                onCompletedFilter = {this.onCompletedFilter}
                notFilter = {this.notFilter}
                deleteAllCompletedTask = {this.deleteAllCompletedTask}
                notCompletedCount = {notCompletedCount}
        />
      </section>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('main'))