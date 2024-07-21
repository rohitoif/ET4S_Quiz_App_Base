import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import Question from './MCQ_Question.jsx';
import Choices from './MCQ_Choices.jsx';
import Submit from './MCQ_Submit.jsx';
import { mcq } from './MCQ_Data.js';
import { img, img2 } from './MCQ_Pics.js';
import Guide from './MCQ_Guidebook.js';
import Pic from './MCQ_Images.js';
import Hint from './MCQ_Hint.js';
import './MCQ.css';
let index = 0;

function MCQPage() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(mcq.length > 0 ? mcq[index].question : '');
  const [choices, setChoices] = useState(mcq.length > 0 ? mcq[index].choices : []);
  const [images1, setImages1] = useState(img.length > 0 ? img[index].src : '');
  const [images2, setImages2] = useState(img2.length > 0 ? img2[index].src2 : '');
  const [hint, setHint] = useState(mcq.length > 0 ? mcq[index].hint : '');
  const [showHint, setShowHint] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [time, setTime] = useState(600);
  const [document, setDocument] = useState(true);
  const [showTimerMessage, setShowTimerMessage] = useState(false);
  const [destroyedChoice, setDestroyedChoice] = useState(null);
  const [showHackingEffect, setShowHackingEffect] = useState(false);
  const [powerups, setPowerups] = useState({
    bomb: true,
    asteroid: true,
    hacker: true
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          endQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
  };

  const checkAnswer = () => {
    if (selectedChoice === mcq[index].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleChange();
  };

  const handleChange = () => {
    index += 1;
    if (index < mcq.length) {
      setQuestion(mcq[index].question);
      setChoices(mcq[index].choices);
      setImages1(img[index].src);
      setImages2(img2[index].src2);
      setHint(mcq[index].hint);
      setSelectedChoice('');
      setShowHint(false);
      setDestroyedChoice(null);
    } else {
      alert('All questions have been answered. Final score is ' + (selectedChoice === mcq[index - 1].correctAnswer ? score + 1 : score));
      resetQuiz();
    }
  };

  const endQuiz = () => {
    alert('Quiz has ended. Final score is ' + score);
    resetQuiz();
  };

  const toggleHint = () => {
    setShowHint((prevShowHint) => !prevShowHint);
  };

  const resetQuiz = () => {
    index = 0;
    setScore(0);
    setQuestion(mcq.length > 0 ? mcq[index].question : '');
    setChoices(mcq.length > 0 ? mcq[index].choices : []);
    setImages1(img.length > 0 ? img[index].src : '');
    setImages2(img2.length > 0 ? img2[index].src2 : '');
    setSelectedChoice('');
    setTime(600);
    setShowHint(false);
    setDestroyedChoice(null);
    setPowerups({ bomb: true, asteroid: true, hacker: true });
  };

  const handlePowerUp = () => {
    if (powerups.bomb) {
      setTime((prevTime) => prevTime + 15);
      setShowTimerMessage(true);
      setTimeout(() => setShowTimerMessage(false), 2000);
      setPowerups((prev) => ({ ...prev, bomb: false }));
    }
  };

  const handleStrikeOut = () => {
    if (powerups.asteroid) {
      const correctAnswer = mcq[index].correctAnswer;
      const incorrectChoices = choices.filter(choice => choice !== correctAnswer);
      const choiceToDestroy = incorrectChoices[Math.floor(Math.random() * incorrectChoices.length)];
      setDestroyedChoice(choiceToDestroy);
      setTimeout(() => {
        const remainingChoices = choices.filter(choice => choice !== choiceToDestroy);
        setChoices(remainingChoices);
        setDestroyedChoice(null);
      }, 1500);
      setPowerups((prev) => ({ ...prev, asteroid: false }));
    }
  };

  const handleSkipQuestion = () => {
    if (powerups.hacker) {
      setShowHackingEffect(true);
      setTimeout(() => {
        setScore((prevScore) => prevScore + 1);
        handleChange();
        setShowHackingEffect(false);
      }, 2000);
      setPowerups((prev) => ({ ...prev, hacker: false }));
    }
  };

  const toggleDocumentation = () => {
    setDocument((prevDocument) => !prevDocument);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mainContent">
      <div className="mainQuestion" style={{ float: 'left' }}>
        <h3>{index + 1}/{mcq.length}</h3>
        <p>Score: {score}</p>
        <div style={{ position: 'relative' }}>
          <p>Time Left: {formatTime(time)}</p>
          <AnimatePresence>
            {showTimerMessage && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'green',
                  fontWeight: 'bold'
                }}
              >
                +15 seconds!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          onClick={handlePowerUp}
          className="powerups"
          whileHover={{ scale: powerups.bomb ? 1.1 : 1 }}
          whileTap={{ scale: powerups.bomb ? 0.9 : 1 }}
          style={{ opacity: powerups.bomb ? 1 : 0.5, cursor: powerups.bomb ? 'pointer' : 'not-allowed' }}
        >
          💣
        </motion.button>
        <motion.button
          onClick={handleStrikeOut}
          className="powerups"
          whileHover={{ scale: powerups.asteroid ? 1.1 : 1 }}
          whileTap={{ scale: powerups.asteroid ? 0.9 : 1 }}
          style={{ opacity: powerups.asteroid ? 1 : 0.5, cursor: powerups.asteroid ? 'pointer' : 'not-allowed' }}
        >
          🌠
        </motion.button>
        <motion.button
          onClick={handleSkipQuestion}
          className="powerups"
          whileHover={{ scale: powerups.hacker ? 1.1 : 1 }}
          whileTap={{ scale: powerups.hacker ? 0.9 : 1 }}
          style={{ opacity: powerups.hacker ? 1 : 0.5, cursor: powerups.hacker ? 'pointer' : 'not-allowed' }}
        >
          🤖
        </motion.button>
        <motion.button
          className="powerups"
          onClick={toggleDocumentation}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ❓
        </motion.button>
        <Question question={question} />
        <Choices 
          choices={choices} 
          onChoiceSelect={handleChoiceSelect} 
          destroyedChoice={destroyedChoice}
        />
        <br />
        <button className="hint" onClick={toggleHint} style={{ color: "purple" }}>HINT</button>
        <br />
        {showHint && <Hint text={hint} />}
        <br />
        <Pic images1={images1} images2={images2} />
        <Submit onClick={checkAnswer} />
      </div>
      <div style={{ float: 'right' }}>{document && <Guide />}</div>
      {showHackingEffect && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'lime',
          fontSize: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div>HACKING IN PROGRESS...</div>
          <div style={{ marginTop: '20px' }}>+1 POINT</div>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MCQPage />
  </React.StrictMode>
);

export default MCQPage;