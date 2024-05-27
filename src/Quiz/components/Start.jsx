import { useState } from "react";
import "../Design/Design.css"; 

const Start = ({ setUsername }) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    setUsername(text);
  };

  return (
    <div className="start text-black">
      <input
        type="text text-black"
        placeholder="Username"
        className="startInput"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="startButton py-0" onClick={handleClick}>Start</button>
    </div>
  );
};

export default Start;
