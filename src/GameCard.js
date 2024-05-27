import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoinCollector from './assets/CoinCollector.jpeg';
import Snake from './assets/Snake.jpeg';
import ChainsawManMaze from './assets/ChainsawMaze.png';
import SaveTheCheese from './assets/SaveTheCheese.jpeg';
import TriviaQuestion from './assets/Quiz.jpeg';
import MemoryCard from './assets/MemoryCard.png';

const GameAttr = {
  'Coin collector': { img: CoinCollector, link: "/coin" },
  'Snake': { img: Snake, link: "/snake" },
  'Chainsaw maze': { img: ChainsawManMaze, link: "/chainsaw-maze" },
  'Save the cheese': { img: SaveTheCheese, link: "/save-the-cheese" },
  'Trivia Questions': { img: TriviaQuestion, link: "/trivia-questions" },
  'Memory Card': { img: MemoryCard, link: "/memory-card" },
};

const CardGame = ({ game }) => {
    const navigate = useNavigate();
    const { img, link } = GameAttr[game.name]; 
    const handleNavigate = () => {
        navigate(link); 
      };
  return (
    <div
    onClick={handleNavigate}
      className="flex no-underline flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-pink-500 w-[500px] h-56 shadow-lg bg-pink-400 cursor-pointer"
    >
      <img
        src={img}
        alt={game.name}
        className="object-cover shadow-lg w-full rounded-t-lg h-96 md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {game.name}
        </h5>
        <p className="mb-3 font-normal text-gray-100">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default CardGame;
