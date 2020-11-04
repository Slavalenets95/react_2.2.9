import React from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    value: '',
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && this.state.value !== '') {
      this.props.createNewTask(this.state.value);
      this.setState({ value: '' });
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        value={this.state.value}
        placeholder="What needs to be done?"
        autoFocus
        onChange={(e) => this.setState({ value: e.target.value })}
        onKeyPress={this.handleKeyPress}
      />
    );
  }
}
