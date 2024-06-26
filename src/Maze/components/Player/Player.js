import React, { useState, useEffect } from "react";
import useEventListener from "@use-it/event-listener";
import playerImg from "../../assets/player.png";

const Player = (props) => {
  const [position, setPosition] = useState({
    xCurrent: 0,
    xPrevious: 0,
    yCurrent: 0,
    yPrevious: 0,
    mapCol: 0,
    mapRow: 0,
  });

  const [facing, setFacing] = useState(0);
  const [step, setStep] = useState(0);

  const playerSize = 77;
  const direction = {
    down: 0,
    left: playerSize * 1,
    right: playerSize * 2,
    up: playerSize * 3,
  };

  useEffect(() => {
    let stepInterval = setInterval(() => {
      if (step >= playerSize * 8) {
        setStep(0);
      }
      setStep(step + 1 * playerSize);
      if (step >= playerSize * 8) {
        setStep(0);
      }
    }, 80);

    if (props.mapBase[position.mapRow][position.mapCol] === 3) {
      props.levelWon();
      setPosition({
        xCurrent: 0,
        xPrevious: 0,
        yCurrent: 0,
        yPrevious: 0,
        mapCol: 0,
        mapRow: 0,
      });
    }

    if (props.mapBase[position.mapRow][position.mapCol] === 2) {
      props.gameFunctions.isDead();
      props.killed();
      setPosition({
        xCurrent: 0,
        xPrevious: 0,
        yCurrent: 0,
        yPrevious: 0,
        mapCol: 0,
        mapRow: 0,
      });
    }

    return () => clearInterval(stepInterval);
  });

  useEventListener("keydown", ({ code }) => {
    if (code.indexOf("Arrow") === -1) return;

    if (code === "ArrowRight") {
      if (
        position.xCurrent + 77 <= 1078 &&
        props.mapBase[position.mapRow][position.mapCol + 1] !== 1
      ) {
        //blokada wyjścia za granicę mapy
        setPosition((prevState) => ({
          ...position,
          mapCol: prevState.mapCol + 1,
          xCurrent: prevState.xCurrent + 77,
          xPrevious: prevState.xCurrent,
        }));
      }
      setFacing(direction.right);
    }
    if (code === "ArrowLeft") {
      if (
        position.xCurrent - 77 >= 0 &&
        props.mapBase[position.mapRow][position.mapCol - 1] !== 1
      ) {
        setPosition((prevState) => ({
          ...position,
          mapCol: prevState.mapCol - 1,
          xCurrent: prevState.xCurrent - 77,
          xPrevious: prevState.xCurrent,
        }));
      }
      setFacing(direction.left);
    }
    if (code === "ArrowDown") {
      if (
        position.yCurrent + 77 <= 693 &&
        props.mapBase[position.mapRow + 1][position.mapCol] !== 1
      ) {
        setPosition((prevState) => ({
          ...position,
          mapRow: prevState.mapRow + 1,
          yCurrent: prevState.yCurrent + 77,
          yPrevious: prevState.yCurrent,
        }));
      }
      setFacing(direction.down);
    }
    if (code === "ArrowUp") {
      if (
        position.yCurrent - 77 >= 0 &&
        props.mapBase[position.mapRow - 1][position.mapCol] !== 1
      ) {
        setPosition((prevState) => ({
          ...position,
          mapRow: prevState.mapRow - 1,
          yCurrent: prevState.yCurrent - 77,
          yPrevious: prevState.yCurrent,
        }));
      }
      setFacing(direction.up);
    }
  });
  return (
    <>
      <div
        id="player"
        style={{
          position: "absolute",
          width: 77,
          height: 77,
          left: position.xCurrent,
          top: position.yCurrent,
          background: `url(${playerImg}) -${step}px -${facing}px`,
        }}></div>
    </>
  );
};

export default Player;
