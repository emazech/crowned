import React, { useEffect, useState } from "react";
import Pyramid from "../components/Pyramid";
import Trivia from "../components/Trivia";
import { moneyPyramid } from "../helpers/moneyPyramid";
import Timer from "../components/Timer";
import Start from "../components/Start";
import { data } from "../helpers/data";
import "../Design/Design.css";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Home = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("0");
  const [username, setUsername] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...data]));
  }, []);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        moneyPyramid.find((item) => item.id === questionNumber - 1)?.amount || "0"
      );
  }, [questionNumber]);

  return (
    <>
      <div id="quizDiv">
          <>
          
              <>
                <main className="main">
                  {stop ? (
                  <>
                      <h1 className="endText">
                        {questionNumber === 13
                          ? `Congrats ${username}, you won the game!`
                          : `${earned} Reward`}
                      </h1>
                      <button
                        className="restartButton py-0"
                        onClick={() => window.location.reload()}
                      >
                        Play Again
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="top">
                        <div className="timer">
                          <Timer
                            setStop={setStop}
                            questionNumber={questionNumber}
                          />
                        </div>
                      </div>
                      <div className="bottom text-white">
                        <Trivia
                          setStop={setStop}
                          questionNumber={questionNumber}
                          setQuestionNumber={setQuestionNumber}
                          questions={shuffledQuestions}
                        />
                      </div>
                    </>
                  )}
                </main>
                <Pyramid
                  questionNumber={questionNumber}
                  moneyPyramid={moneyPyramid}
                />
              </>
          </>
      
      </div>
    </>
  );
};

export default Home;
