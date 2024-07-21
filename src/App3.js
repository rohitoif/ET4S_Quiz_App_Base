import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import Results from './Results';
import './styles.css';

const App = () => {
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Timer set to 60 seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsFinished(true);
    }
  }, [timeLeft]);

  const handleQuizCompletion = (finalScore) => {
    setScore(finalScore);
    setIsFinished(true);
  };

  return (
    <div className="app">
      <div className="timer">Time Left: {timeLeft}s</div>
      {isFinished ? <Results score={score} /> : <Quiz onComplete={handleQuizCompletion} />}
    </div>
  );
};

export default App;
