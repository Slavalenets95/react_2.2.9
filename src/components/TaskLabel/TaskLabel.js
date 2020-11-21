import React from 'react';
import { formatDistanceToNow, formatDistanceStrict } from 'date-fns';
import PropTypes from 'prop-types';
export default class TaskLabel extends React.Component {
  static propTypes = {
    taskText: PropTypes.string,
    date: PropTypes.object,
  };

  state = {
    date: formatDistanceToNow(this.props.date),
  };

  updateDate = () => {
    this.setState((state) => {
      return {
        date: formatDistanceStrict(this.props.date, new Date())
      };
    });
  };

  componentWillUpdate() {
    if(this.props.timer === 0) clearInterval(this.timerId)
  }

  componentWillUnmount() {
    clearInterval(this.dateTimerId);
    clearInterval(this.timerId)
  }

  componentDidMount = () => {
    this.dateTimerId = setInterval(() => this.updateDate(), 1000);
  };

  onTimer = () => {
    console.log(this.timerId)
    if(!this.timerId) {
      this.timerId = setInterval(() => this.props.onTimer(this.props.id, 1000), 1000)
    }
  }
  offTimer = () => {
    clearInterval(this.timerId)
    this.timerId = undefined
  }
  formatTimer = (time) => {
    const min = Math.floor(time/60000) 
    const sec = (time%60000)/1000
    return `${min} min ${sec} sec`
  }
  render() {
    const { taskText, timer, onTimer } = this.props;

    return (
      <label>
        <span className="title">{taskText}</span>
        <span className="description">
          <button className="icon icon-play" onClick={this.onTimer}></button>
          <button className="icon icon-pause" onClick={this.offTimer}></button>
          {this.formatTimer(timer)}
        </span>
        <span className="created">{`${this.state.date} ago`}</span>
      </label>
    );
  }
}

