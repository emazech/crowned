import React, { useState } from "react";
import "./App.css";
import CategoryAndNumOfLettersToChoose from "./SaveTheCheese/Components/CategoryAndNumOfLetterToChoose.js";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WordToGuess from "./SaveTheCheese/Components/WordToGuess.js";
import Maze from "./Maze/Maze.js";
import Crown from "./assets/crown.png";
import Icon from "./assets/icon.png";
import Home from "./Quiz/pages/Home.jsx";
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import CoinCollector from './CoinCollector';
import Snake from './snake';
import TimedCC from './TimedCC';
import TimeCoinCollector from './TimeCoinCollector';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/coin" element={<CoinCollector />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/TimedCC" element={<TimedCC />} />
        <Route path="/timecoin" element={<TimeCoinCollector />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
