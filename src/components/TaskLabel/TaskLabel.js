import React from 'react';
import { formatDistanceToNow } from 'date-fns';
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
        date: formatDistanceToNow(this.props.date, {
          includeSeconds: true,
          addSuffix: true,
        }),
      };
    });
  };

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidMount = () => {
    this.timerId = setInterval(() => this.updateDate(), 1000);
  };

  render() {
    const { taskText } = this.props;

    return (
      <label>
        <span className="description">{taskText}</span>
        <span className="created">{this.state.date}</span>
      </label>
    );
  }
}
