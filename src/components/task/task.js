import React from 'react';
import './Task.css';
import PropTypes from 'prop-types';
import TaskLabel from '../TaskLabel';
export default class Task extends React.Component {
  static defaultProps = {
    completed: false,
  };

  static propTypes = {
    taskText: PropTypes.string,
    completed: PropTypes.bool,
  };

  state = {
    isEdit: false,
    editValue: this.props.taskText,
  };

  onEdit = () => {
    this.setState(({ isEdit }) => ({ isEdit: !isEdit }));
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      this.props.editTask(e.target.value);
      this.onEdit();
    }
  };

  render() {
    const { taskText, date, completed, setTaskCompleted, deleteTask } = this.props;

    let classNames = completed === true ? 'completed' : '';
    classNames = this.state.isEdit === true ? 'editing' : classNames;

    const editInput =
      this.state.isEdit === true ? (
        <input
          type="text"
          className="edit"
          value={this.state.editValue}
          autoFocus
          onChange={(e) => this.setState({ editValue: e.target.value })}
          onKeyPress={this.handleKeyPress}
        />
      ) : null;

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={setTaskCompleted} />
          <TaskLabel taskText={taskText} date={date} />
          <button className="icon icon-edit" onClick={this.onEdit}></button>
          <button className="icon icon-destroy" onClick={deleteTask}></button>
        </div>
        {editInput}
      </li>
    );
  }
}
