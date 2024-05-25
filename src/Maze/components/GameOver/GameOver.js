import React from "react";
import "./style.scss";
import chainsawImg from "../../assets/chainsaw.png";
import soundLaugh from "../../sound/laugh.mp3";

const GameOver = (props) => {
  const startGame = () => {
    props.gameFunctions.isStartClicked();
  };

  return (
    <>
      <div id="maze">
        <div className="maze-card">
          <div className="maze-container">
            <h1>You have lost!</h1>
            <img className="saw" src={chainsawImg} alt="chainsaw doll" />
          </div>
          <button onClick={startGame}>PLAY AGAIN</button>
        </div>
        <audio autoPlay>
          <source src={soundLaugh} type="audio/mpeg"></source>
        </audio>
      </div>
    </>
  );
};

export default GameOver;
