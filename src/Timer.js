import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Import CSS file for styling

const CountdownTimer = ({ onTimerEnd }) => {
  const [time, setTime] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time === 1) {
        clearInterval(timer);
        if (onTimerEnd) {
          onTimerEnd();
        }
      } else {
        setTime(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimerEnd]);

  return (
    <div className="countdown-timer-container text-center flex justify-center h-[100vh] w-[100vh]">
      <div className="countdown-timer text-center flex justify-center items-center">
        <div className={`timer-circle ${time === 1 ? 'pulsate' : ''}`}></div>
        <div className={`timer-text ${time === 1 ? 'timer-text-animation' : ''}`}>
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
