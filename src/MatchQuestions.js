import React, { useState, useRef, useEffect } from "react";
import "./MatchQuestions.css";
import { FaPlusCircle, FaQuestionCircle } from "react-icons/fa";

const questions = [
  { id: 1, question: "BLACK HOLE", answerId: 1 },
  { id: 2, question: "COMET", answerId: 2 },
  { id: 3, question: "NEBULA", answerId: 3 },
  { id: 4, question: "ASTEROID", answerId: 4 },
  { id: 5, question: "DWARF PLANET", answerId: 5 },
];

const answers = [
  { id: 4, answer: "Rocky body in space" },
  { id: 2, answer: "Icy body with a tail" },
  { id: 1, answer: "Massive star collapse" },
  { id: 5, answer: "Small celestial body orbiting the sun" },
  { id: 3, answer: "Star-forming region" },
];

function MatchQuestions() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [matches, setMatches] = useState([]);
  const [markedAnswers, setMarkedAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [addTimeUsed, setAddTimeUsed] = useState(false);
  const [giveAnswerUsed, setGiveAnswerUsed] = useState(false);
  const [isHoveringQuestionMark, setIsHoveringQuestionMark] = useState(false);
  const [isHoveringPlusSign, setIsHoveringPlusSign] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      drawLines();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [matches]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleAnswerClick = (answer) => {
    if (selectedQuestion) {
      const existingMatchIndex = matches.findIndex(
        (match) => match.questionId === selectedQuestion.id
      );

      let newMatches = [...matches];

      if (existingMatchIndex !== -1) {
        newMatches.splice(existingMatchIndex, 1);
      }

      const newMatch = { questionId: selectedQuestion.id, answerId: answer.id };
      newMatches = [...newMatches, newMatch];

      setMatches(newMatches);
      setSelectedQuestion(null);
    }
  };

  const handleCheckMatches = () => {
    let newMarkedAnswers = {};
    let newCorrectCount = 0;

    matches.forEach((match) => {
      const isCorrect = questions.find(q => q.id === match.questionId).answerId === match.answerId;
      newMarkedAnswers[match.answerId] = isCorrect ? "correct" : "incorrect";
      if (isCorrect) newCorrectCount++;
    });

    setMarkedAnswers(newMarkedAnswers);
    setCorrectCount(newCorrectCount);
    setShowPopup(true);
  };

  const drawLines = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    matches.forEach((match) => {
      const questionElement = document.getElementById(
        `question-${match.questionId}`
      );
      const answerElement = document.getElementById(`answer-${match.answerId}`);
      const questionRect = questionElement.getBoundingClientRect();
      const answerRect = answerElement.getBoundingClientRect();

      const canvasRect = canvas.getBoundingClientRect();

      const lineStartX = questionRect.right - canvasRect.left;
      const lineStartY =
        questionRect.top + questionRect.height / 2 - canvasRect.top;

      const lineEndX = answerRect.left - canvasRect.left;
      const lineEndY = answerRect.top + answerRect.height / 2 - canvasRect.top;

      context.beginPath();
      context.moveTo(lineStartX, lineStartY);
      context.lineTo(lineEndX, lineEndY);
      context.strokeStyle = match.automated ? "#00ff00"  : "#ffffff"; 
      context.lineWidth = 2;
      context.stroke();
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddTime = () => {
    if (!addTimeUsed) {
      setTimeLeft(timeLeft + 30);
      setAddTimeUsed(true);
    }
  };

  const handleGiveAnswer = () => {
    if (!giveAnswerUsed) {
      const incorrectMatches = matches.filter(
        (match) =>
          questions.find((q) => q.id === match.questionId).answerId !==
          match.answerId
      );

      let newMatch;
      if (incorrectMatches.length > 0) {
        const matchToCorrect = incorrectMatches[0];
        newMatch = {
          questionId: matchToCorrect.questionId,
          answerId: questions.find(
            (q) => q.id === matchToCorrect.questionId
          ).answerId,
          automated: true,
        };
        setMatches((prevMatches) =>
          prevMatches.map((match) =>
            match.questionId === matchToCorrect.questionId
              ? newMatch
              : match
          )
        );
      } else {
        const unmatchedQuestions = questions.filter(
          (q) => !matches.some((match) => match.questionId === q.id)
        );
        if (unmatchedQuestions.length > 0) {
          const question = unmatchedQuestions[0];
          newMatch = {
            questionId: question.id,
            answerId: question.answerId,
            automated: true,
          };
          setMatches((prevMatches) => [...prevMatches, newMatch]);
        }
      }
      setGiveAnswerUsed(true);
    }
  };

  const handleQuestionMarkHover = () => {
    setIsHoveringQuestionMark(true);
    setPopupMessage("Want a hint? Here's a free correct answer for your hard work!");
  };

  const handleQuestionMarkLeave = () => {
    setIsHoveringQuestionMark(false);
    setPopupMessage("");
  };

  const handlePlusSignHover = () => {
    setIsHoveringPlusSign(true);
    setPopupMessage("Want extra time? Here's a gift from us!");
  };

  const handlePlusSignLeave = () => {
    setIsHoveringPlusSign(false);
    setPopupMessage("");
  };

  return (
    <div className="match-questions">
      <div className="header">
        <h1>Match the Columns</h1>
        <div className="power-ups">
          <button
            className="power-up-btn"
            onClick={handleAddTime}
            disabled={addTimeUsed}
            onMouseEnter={handlePlusSignHover}
            onMouseLeave={handlePlusSignLeave}
          >
            <FaPlusCircle size={20} />
            {isHoveringPlusSign && <div className="tooltip">{popupMessage}</div>}
          </button>
          <button
            className="power-up-btn"
            onClick={handleGiveAnswer}
            disabled={giveAnswerUsed}
          >
            <FaQuestionCircle
              size={20}
              onMouseEnter={handleQuestionMarkHover}
              onMouseLeave={handleQuestionMarkLeave}
            />
            {isHoveringQuestionMark && <div className="tooltip">{popupMessage}</div>}
          </button>
        </div>
        <div className="score">
          <div>Points: {correctCount}</div>
          <div>Time Left: {timeLeft}s</div>
        </div>
      </div>
      <div className="columns-container">
        <div className="columns">
          <div className="questions">
            {questions.map((q) => (
              <div
                key={q.id}
                id={`question-${q.id}`}
                className={`question ${
                  selectedQuestion?.id === q.id ? "selected" : ""
                }`}
                onClick={() => handleQuestionClick(q)}
              >
                {q.question}
              </div>
            ))}
          </div>
          <div className="answers">
            {answers.map((a) => (
              <div
                key={a.id}
                id={`answer-${a.id}`}
                className={`answer ${markedAnswers[a.id]}`}
                onClick={() => handleAnswerClick(a)}
              >
                {a.answer}
              </div>
            ))}
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="canvas" />
      <div className="check-btn-container">
        <button className="check-btn" onClick={handleCheckMatches}>
          &#x2192;
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Quiz Completed!</h2>
            <p>You got {correctCount} out of {questions.length} correct.</p>
            <button className="close-btn" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchQuestions;
