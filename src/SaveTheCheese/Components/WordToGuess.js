import { useState, useEffect } from "react";
import React from "react";
import '../CSS/WordToGuess.css';
import LettersToTry from './LettersToTry.js';
import HangmanDisplay from './HangmanDisplay.js';
import checkmark from '../Images/checkmark.png';
import xmark from '../Images/xmark.png';
import mouse from '../Images/mouse.png';
import { natureAndEasy, natureAndMedium, natureAndDifficult, entertainmentAndEasy, entertainmentAndMedium, entertainmentAndDifficult, societyAndEasy, societyAndMedium, societyAndDifficult } from '../Components/Word.js';

function WordToGuess() {

    const [linesForWordToGuess, setLinesForWordToGuess] = useState([]);
    const [word, setWord] = useState([]);
    const [wrongGuess, setWrongGuess] = useState(0);
    const [wordSelected, setWordSelected] = useState(false);

    const fragment = decodeURIComponent(window.location.hash);
    const params = fragment.split('?')[1].split('&').map(param => param.split('='));
    const queryParams = Object.fromEntries(params);
    const category = queryParams.category;
    const level = queryParams.level;
    
    let wordsToChoseFrom;

    switch (category) {
        case 'nature':
            wordsToChoseFrom = { easy: natureAndEasy, medium: natureAndMedium, hard: natureAndDifficult };
            break;
        case 'entertainment':
            wordsToChoseFrom = { easy: entertainmentAndEasy, medium: entertainmentAndMedium, hard: entertainmentAndDifficult };
            break;
        default:
            wordsToChoseFrom = { easy: societyAndEasy, medium: societyAndMedium, hard: societyAndDifficult };
            break;
    }

    const setOfWords = wordsToChoseFrom[level];

    function returnAWordToGuess() {
        let indexOfRandomWord = Math.floor(Math.random() * setOfWords.length);

        setWrongGuess(0);

        setOfWords.forEach(searchForTheValueFromSetOfWordsWithTheIndexOfRandomWord);

        function searchForTheValueFromSetOfWordsWithTheIndexOfRandomWord(item, index) {

            if (index === indexOfRandomWord) {
                let word = item;

                let linesForWordToGuess = Array.from(item).map((letterOfWordToGuess, indexOfLetterOfWordToGuess) =>
                    <li key={"letterAndLineContainer" + indexOfLetterOfWordToGuess} className="letterAndLineContainer">
                        <span key={"letterAboveLine" + indexOfLetterOfWordToGuess} className="letterAboveLine"></span>
                        <span key={indexOfLetterOfWordToGuess} className="lineForWordToGuess">&nbsp;_______&nbsp;</span>
                    </li>
                );

                setLinesForWordToGuess(linesForWordToGuess);
                setWord(word);
                setWordSelected(true);
            }

        }

        const elements = document.getElementsByClassName('letterAboveLine');
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerText = '';
        }

        document.getElementById('mark').style.opacity = 0;
        if( document.getElementById('mouse')) document.getElementById('mouse').src = mouse;
        let lettersOfAbcFromThePreviousWord = document.getElementsByClassName('letters');
        (Array.from(lettersOfAbcFromThePreviousWord)).forEach((letterFromPreviousWord, indexOfLetterFromPreviousWord) => {
            letterFromPreviousWord.classList.remove('alreadyInWordLetter');
            letterFromPreviousWord.classList.remove('wrongLetterGuess');
            letterFromPreviousWord.classList.remove('untriedLetter');
        });

        return [linesForWordToGuess, word];
    }

    const backToMainPage = () => {
        window.location.href = '/save-the-cheese/';
    };

    useEffect(() => {
        returnAWordToGuess();
    }, );

    return (
        <>
            <div id="gameDiv">
                <ul>
                    {linesForWordToGuess}
                    <li className="letterAndLineContainer">
                        <span className="imgAboveLine">
                            <img src={wrongGuess > 6 ? xmark : checkmark} alt="mark" id="mark"></img>
                        </span>
                    </li>
                </ul>
                <br></br>
                {wordSelected && <HangmanDisplay wrongGuess={wrongGuess}></HangmanDisplay>}
                <br></br>
                <br></br>
                <div id="buttonDiv">
                    <button type="button" onClick={returnAWordToGuess} id="btnIWantAWord">I want another word!</button>
                    <button type="button" id="backBtn" onClick={backToMainPage}>Back to the main page!</button>
                </div>
            </div>
            <LettersToTry word={word} wrongGuess={wrongGuess} onWrongLetter={() => setWrongGuess(wrongGuess + 1)}></LettersToTry>
        </>
    )

}

export default WordToGuess;