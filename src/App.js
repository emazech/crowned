import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import ChooseGame from "./ChooseGames";
import CoinCollector from "./CoinCollector";
import Snake from "./Snake";
import ChainsawMaze from "./Maze/Maze";
import TriviaQuestions from "./Quiz/pages/Home";
import MemoryCard from "./Memory/Memory";
import SaveTheCheese from "./SaveTheCheese/Components/WordToGuess.js";
import CategoryAndNumOfLettersToChoose from "./SaveTheCheese/Components/CategoryAndNumOfLetterToChoose";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  return (
      <Router>
        <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} s/>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/choose-game" element={<ChooseGame />} />
              <Route path="/coin" element={<CoinCollector />} />
              <Route path="/snake" element={<Snake />} />
              <Route path="/chainsaw-maze" element={<ChainsawMaze />} />
              <Route path="/save-the-cheese" element={<SaveTheCheese />} />
              <Route path="/choosecategory" element={<CategoryAndNumOfLettersToChoose />} />
              <Route path="/trivia-questions" element={<TriviaQuestions />} />
              <Route path="/memory-card" element={<MemoryCard />} />
              <Route path="/" element={<Login />} />\
              </Routes>
      </Router>
  );
}

export default App;
