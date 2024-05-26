import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from '../Assets/play.mp3';
import correct from "../Assets/correct.mp3";
import wrong from "../Assets/wrong.mp3";

const Trivia = ({ setStop, questionNumber, setQuestionNumber, questions }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(questions[questionNumber - 1]);
  }, [questionNumber, questions]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (item) => {
    setSelectedAnswer(item);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(item.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (item.correct) {
        correctAnswer();
        delay(1000, () => {
          if (questionNumber === 13) {
            setStop(true);
          } else {
            setQuestionNumber((prev) => prev + 1);
            setSelectedAnswer(null);
          }
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((item, index) => (
          <div
            key={index}
            className={selectedAnswer === item ? className : "answer"}
            onClick={() => handleClick(item)}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Trivia;
