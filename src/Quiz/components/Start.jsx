import { useState } from "react";
import "../Design/Design"

const Start = ({setUsername}) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    setUsername(text)
  }

  return (
    <div className="start">
      <input
        type="text"
        placeholder="Username"
        className="startInput"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="startButton" onClick={handleClick}>Start</button>
    </div>
  );
};

export default Start;
