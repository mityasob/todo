import React, { useState, useEffect } from 'react';
import './Timer.css';
import PropTypes from 'prop-types';

const Timer = ({ todos }) => {
  const [minutesLeft, setMinutesLeft] = useState(todos.minutes);
  const [secondsLeft, setSecondsLeft] = useState(todos.seconds);
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(true);

  function handlePlayButton() {
    if (!play && (minutesLeft || Number(secondsLeft))) {
      setPlay(true);
      setStop(false);
    }
  }

  function handleStopButton() {
    if (!stop) {
      setPlay(false);
      setStop(true);
    }
  }

  function tick() {
    if (!Number(secondsLeft)) {
      setMinutesLeft(minutesLeft - 1);
      setSecondsLeft(59);
    } else {
      setSecondsLeft(secondsLeft > 10 ? secondsLeft - 1 : `0${secondsLeft - 1}`);
    }
  }

  useEffect(() => {
    let timerID;
    if (!minutesLeft && !Number(secondsLeft)) {
      setPlay(false);
    }
    if (play) {
      timerID = setInterval(() => tick(), 1000);
    }
    return () => clearInterval(timerID);
  });

  return (
    <span className="description">
      <button className="icon icon-play" onClick={handlePlayButton}></button>
      <button className="icon icon-pause" onClick={handleStopButton}></button>
      <span>
        {minutesLeft}:{secondsLeft}
      </span>
    </span>
  );
};

Timer.defaultProps = {
  todos: {},
};
Timer.propTypes = {
  todos: PropTypes.object,
};

export default Timer;
