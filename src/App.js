import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import CategoryAndNumOfLettersToChoose from './SaveTheCheese/Components/CategoryAndNumOfLetterToChoose.js';
import WordToGuess from './SaveTheCheese/Components/WordToGuess.js';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Crown from './assets/crown.png';
import Icon from './assets/icon.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <div className="side">
        <img src={Crown} alt='CrownIcon' className='crown-icon' />
        <p className='crown'>WELCOME TO CROWNED</p>
        <img src={Icon} alt='GameIcon' />
      </div>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
          {isLoggedIn ? (
            <>
              <Route path="/game" element={<WordToGuess />} />
              <Route path="/" element={<CategoryAndNumOfLettersToChoose />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
