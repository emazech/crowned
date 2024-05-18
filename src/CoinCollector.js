import React, { useState, useEffect, useCallback } from 'react';
import './CoinCollector.css';
import characterImage from './assets/character.png';
import coinImage from './assets/coin.png';

const squareSize = 50;

const CoinCollector = () => {
  const numCols = 12;
  const numRows = 8;

  const [position, setPosition] = useState({ row: 0, col: 0 });
  const [coins, setCoins] = useState(generateRandomCoins());
  const [score, setScore] = useState(0);

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

  return (
    <div className="background">
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
    </div>
  );
};

export default CoinCollector;
