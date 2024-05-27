import React, { useState, useEffect } from 'react';
import './SnakeGame.css';
import CountdownTimer from './timer';

const SnakeGame = () => {
    const [snakeBody, setSnakeBody] = useState([{ x: 6, y: 9 }, { x: 5, y: 9 }, { x: 4, y: 9 }]);
    const [foodPosition, setFoodPosition] = useState({ x: 10, y: 10 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [canChangeDirection, setCanChangeDirection] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (canChangeDirection) {
                switch (event.key) {
                    case 'ArrowUp':
                        if (direction !== 'DOWN') setDirection('UP');
                        break;
                    case 'ArrowDown':
                        if (direction !== 'UP') setDirection('DOWN');
                        break;
                    case 'ArrowLeft':
                        if (direction !== 'RIGHT') setDirection('LEFT');
                        break;
                    case 'ArrowRight':
                        if (direction !== 'LEFT') setDirection('RIGHT');
                        break;
                    default:
                        break;
                }
                setCanChangeDirection(false);
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [direction, canChangeDirection]);

    useEffect(() => {
        const gameLoop = setInterval(() => {
            if (!gameOver && gameStarted) {
                moveSnake();
                checkCollision();
            }
        }, 200);

        return () => clearInterval(gameLoop);
    }, [snakeBody, direction, gameOver, gameStarted]);

    const moveSnake = () => {
        const newSnakeBody = [...snakeBody];
        let newHead = { ...newSnakeBody[0] };

        switch (direction) {
            case 'UP':
                newHead.y -= 1;
                break;
            case 'DOWN':
                newHead.y += 1;
                break;
            case 'LEFT':
                newHead.x -= 1;
                break;
            case 'RIGHT':
                newHead.x += 1;
                break;
            default:
                break;
        }

        newSnakeBody.unshift(newHead);
        if (!checkFoodCollision(newHead)) {
            newSnakeBody.pop();
        } else {
            setFoodPosition(generateFoodPosition());
            setScore(score + 1);
        }

        if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20) {
            setGameOver(true);
            return;
        }
    
        setSnakeBody(newSnakeBody);
        setCanChangeDirection(true);
    };

    const checkCollision = () => {

        const head = snakeBody[0];
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
            setGameOver(true);
        }

        for (let i = 1; i < snakeBody.length; i++) {
            if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
                setGameOver(true);
                break;
            }
        }
    };

    const checkFoodCollision = (head) => {
        return head.x === foodPosition.x && head.y === foodPosition.y;
    };

    const generateFoodPosition = () => {
        let newPosition;
        do {
            newPosition = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
        } while (snakeBody.some((segment) => segment.x === newPosition.x && segment.y === newPosition.y));
        return newPosition;
    };

    const restartGame = () => {
        setSnakeBody([{ x: 6, y: 9 }, { x: 5, y: 9 }, { x: 4, y: 9 }]);
        setFoodPosition({ x: 10, y: 10 });
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setGameStarted(false);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    return (
        <div className="game-container">
            {!gameStarted && (
                <div className="countdown-timer-wrapper">
                    <CountdownTimer hours={0} minutes={0} seconds={3} onTimerEnd={startGame} />
                </div>
            )}
            {gameStarted && (
                <div className="game-board">
                    {snakeBody.map((segment, index) => (
                        <div key={index} className="snake-segment" style={{ left: segment.x * 20, top: segment.y * 20 }}></div>
                    ))}
                    <div className="food" style={{ left: foodPosition.x * 20, top: foodPosition.y * 20 }}></div>
                    {gameOver && (
                        <div className="game-over">
                           <p> Game Over!</p>
                           <button onClick={restartGame} className='restart-button'>Restart</button>
                        </div>
                    )}
                </div>
            )}
            <div className="game-info">
                <div>Score: {score}</div>
            </div>
        </div>
    );
};

export default SnakeGame;
