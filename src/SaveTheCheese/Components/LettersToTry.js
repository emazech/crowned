import React from "react";
import '../CSS/LettersToTry.css';
import nocheese from '../Images/nocheese.png';

function LettersToTry(props) {

    const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    let word = props.word;
    let wrongGuess = props.wrongGuess;
    let onWrongLetter = props.onWrongLetter;
    let letterAboveLine = document.getElementsByClassName('letterAboveLine');
    
    const elementsToReturn = abc.map((item, index) => {
        const handleClick = () => isThisLetterInTheWord(item);
        return (
          <button type="button" id={item} className="letters" key={index} onClick={handleClick}>
            {item}
          </button>
        );
    });
      
    const unTriedLetter = () => {
        document.getElementById('mark').style.opacity = 1;
        Array.from(document.getElementsByClassName('letters')).forEach((letter) => {
            letter.classList.add('untriedLetter');
        });
        document.getElementById('mouse').src = nocheese;
    }
    
    function isThisLetterInTheWord(letterOfAbc) {
        let letterFound = false;
        let letterOfAbcElement = document.getElementById(letterOfAbc);
        (Array.from(word)).forEach((letterOfWord, indexOfWord) => {
            if (letterOfWord === letterOfAbc) {
                letterFound = true;
                (Array.from(letterAboveLine)).forEach((line, indexOfLine) => {
                    if (indexOfLine === indexOfWord) {
                        line.innerText = letterOfWord;
                        if (!(letterOfAbcElement.classList.contains('alreadyInWordLetter'))) {
                            letterOfAbcElement.classList.add('alreadyInWordLetter');
                        }
                    }
                });

                if ((document.querySelectorAll('.alreadyInWordLetter')).length === word.length) {
                    unTriedLetter();
                } else {
                    const indexes = [];
                    (Array.from(document.querySelectorAll('.alreadyInWordLetter'))).forEach((charElement) => {
                        const char = charElement.textContent;
                        let index = -1;
                        
                        do {
                          index = word.indexOf(char, index + 1);
                          if (index !== -1) {
                            indexes.push(index);
                          }
                        } while (index !== -1);

                    }); 

                    if(indexes.length === word.length){
                        unTriedLetter();
                    }
                }

            }
        });

        if (!letterFound && onWrongLetter) {
            onWrongLetter();
            letterOfAbcElement.classList.add('wrongLetterGuess');
            console.log(wrongGuess);
            if(wrongGuess>5) {
                unTriedLetter();
                (Array.from(word)).forEach((letterOfWord,indexOfWord) => {
                    (Array.from(letterAboveLine)).forEach((line, indexOfLine) => {
                        if (indexOfLine === indexOfWord) {
                            line.innerText = letterOfWord;
                        }
                    });
                });
            }
        }
    }

    return <div id="elementsToReturn">{elementsToReturn}</div>;

}

export default LettersToTry;