import React, { useState, useEffect, useCallback } from 'react';
import './CoinCollector.css';
import characterImage from './assets/haley.png';
import coinImage from './assets/coin.png';
import Timer from './Timer';

const squareSize = 50;
const gameid = 4;

const CoinCollector = () => {
  const numCols = 12;
  const numRows = 8;

  const [position, setPosition] = useState({ row: 0, col: 0 });
  const [coins, setCoins] = useState(generateRandomCoins());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  function generateRandomCoins() {
    const coins = [];
    for (let i = 0; i < 5; i++) {
      coins.push({
        id: i,
        row: Math.floor(Math.random() * numRows),
        col: Math.floor(Math.random() * numCols),
      });
    }
    return coins;
  }

  const handleKey = useCallback((event) => {
    let newRow = position.row;
    let newCol = position.col;
    if (event.key === 'ArrowUp') {
      newRow = Math.max(newRow - 1, 0);
    } else if (event.key === 'ArrowDown') {
      newRow = Math.min(newRow + 1, numRows - 1);
    } else if (event.key === 'ArrowLeft') {
      newCol = Math.max(newCol - 1, 0);
    } else if (event.key === 'ArrowRight') {
      newCol = Math.min(newCol + 1, numCols - 1);
    }
    setPosition({ row: newRow, col: newCol });
  }, [position, numRows, numCols]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  useEffect(() => {
    const collectedCoins = coins.filter(
      (coin) => coin.row === position.row && coin.col === position.col
    );
    if (collectedCoins.length > 0) {
      setCoins((prevCoins) =>
        prevCoins.filter((coin) => !collectedCoins.includes(coin))
      );
      setScore((prevScore) => prevScore + collectedCoins.length);
    }
  }, [position, coins]);

  useEffect(() => {
    if (coins.length === 0) {
      setGameOver(true);
      sendScoreToBackend(userId, gameid, score);
    }
  }, [coins, score]);

  const userId = localStorage.getItem('userid');

  const sendScoreToBackend = async (userId, gameid, newScore) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: newScore, user_id: userId, game_id: gameid }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Score sent successfully:', result);
    } catch (error) {
      console.error('Failed to send score:', error);
      console.log(userId, gameid, newScore);
    }
  };
  const startGame = () => {
    setGameStarted(true);
  };


  const restartGame = () => {
    setPosition({ row: 0, col: 0 });
    setCoins(generateRandomCoins());
    setGameOver(false);
    sendScoreToBackend(userId, gameid, score); // Send the score to the backend
    setScore(0); // Reset the score after sending it to the backend
    setGameStarted(true);
  };

  return (
    <div className="background">
      {gameStarted ? ( // Render the game or countdown timer based on gameStarted state
        <>
          <div className="score">Score: {score}</div>
          {coins.map((coin) => (
            <img
              key={coin.id}
              src={coinImage}
              alt="Coin"
              className="coin"
              style={{
                top: `${coin.row * squareSize + (squareSize - 20) / 2}px`,
                left: `${coin.col * squareSize + (squareSize - 20) / 2}px`,
              }}
            />
          ))}
          <img
            src={characterImage}
            alt="Character"
            className="character"
            style={{
              top: `${position.row * squareSize}px`,
              left: `${position.col * squareSize}px`,
            }}
          />
          {gameOver && (
            <button className="restart-button" onClick={restartGame}>
              Restart Game
            </button>
          )}
        </>
      ) : (
        <div className="countdown-timer-wrapper">
          <Timer hours={0} minutes={0} seconds={3} onTimerEnd={startGame} />
        </div>
      )}
    </div>
  );
};
export default CoinCollector;
