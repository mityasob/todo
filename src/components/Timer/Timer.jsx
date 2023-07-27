import React from 'react';
import './Timer.css';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: this.props.todos.minutes,
      seconds: this.props.todos.seconds,
      play: false,
      stop: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.play !== prevState.play) {
      if (this.state.play) {
        this.timerID = setInterval(() => this.tick(), 1000);
      } else {
        clearInterval(this.timerID);
      }
    }
  }

  tick() {
    const { minutes, seconds } = this.state;
    if (!minutes && Number(seconds) === 1) {
      clearInterval(this.timerID);
    }
    if (!Number(seconds)) {
      this.setState({
        minutes: minutes - 1,
        seconds: 59,
      });
    } else {
      this.setState({
        seconds: seconds > 10 ? seconds - 1 : `0${seconds - 1}`,
      });
    }
  }

  handlePlayButton = () => {
    const { minutes, seconds, play } = this.state;
    if (!play && (minutes || Number(seconds))) {
      this.setState({
        play: true,
        stop: false,
      });
    }
  };

  handleStopButton = () => {
    if (!this.state.stop) {
      this.setState({
        play: false,
        stop: true,
      });
    }
  };

  render() {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.handlePlayButton}></button>
        <button className="icon icon-pause" onClick={this.handleStopButton}></button>
        <span>
          {this.state.minutes}:{this.state.seconds}
        </span>
      </span>
    );
  }
}

Timer.defaultProps = {
  todos: {},
};
Timer.propTypes = {
  todos: PropTypes.object,
};

export default Timer;
