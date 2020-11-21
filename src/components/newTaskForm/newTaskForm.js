import React from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    value: '',
    minutes : '',
    seconds : '',
  };

  handleKeyPress = (e) => {
    const {value, minutes, seconds} = this.state
    if (e.key === 'Enter' && this.state.value !== '') {
      const timer = minutes*60000 + seconds*1000
      this.props.createNewTask(value, timer);
      this.setState({ value: '', minutes: '', seconds: '', });
    }
  };

  render() {
    return (
      <form className="new-todo-form"
            onKeyPress={this.handleKeyPress}
      >
        <input
          className="new-todo"
          value={this.state.value}
          placeholder="What needs to be done?"
          autoFocus
          onChange={(e) => this.setState({ value: e.target.value })}
        />
        <input className="new-todo-form__timer" 
               placeholder="Min"
               value={this.state.minutes}
               onChange={(e) => this.setState({ minutes: e.target.value})}
               >
               
        </input>
        <input className="new-todo-form__timer" 
               placeholder="Sec"
               value={this.state.seconds} 
               onChange={(e) => this.setState({ seconds : e.target.value})}
        >
        </input>
      </form>
    );
  }
}
