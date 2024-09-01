import React from "react";
import "./Clock.css";

const Clock = ({ size = 200 }) => {
  return (
    <div className="Clock" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <circle className="clock-face" cx="50" cy="50" r="48" />
        <line className="hour-hand" x1="50" y1="50" x2="50" y2="25" />
        <line className="minute-hand" x1="50" y1="50" x2="50" y2="15" />
      </svg>
    </div>
  );
};

export default Clock;
