
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./MatchQuestions.css";
import { db, updateDoc, doc, getDoc } from '../../firebase.js'; // Import Firestore functions
import { useUser } from '../../UserContext.js';
import DocumentationModal from './DocumentationModal'
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


let correctCount = 0;
const quizID = 2; // Set constant quiz ID

let powerUpCount = 0;
function A_MatchPage(props) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [matches, setMatches] = useState([]);
  const [markedAnswers, setMarkedAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [addTimeUsed, setAddTimeUsed] = useState(false);
  const [giveAnswerUsed, setGiveAnswerUsed] = useState(false);
  const [isHoveringQuestionMark, setIsHoveringQuestionMark] = useState(false);
  const [isHoveringPlusSign, setIsHoveringPlusSign] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [showDoc, setShowDoc] = useState(true);
  const [quizPlayed, setQuizPlayed] = useState(false); // New state for checking if quiz is played
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // Use navigate for navigation
  const { userId } = useUser();

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
    } else {
      handleCheckMatches();
    }
  }, [timeLeft]);

  useEffect(() => {
    const checkQuizPlayed = async () => {
      if (userId) {
        try {
          const userRef = doc(db, 'et4s_main', userId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const playedQuizzes = userDoc.data().hasPlayedQuizzes || {};
            setQuizPlayed(playedQuizzes[quizID] || false); // Check if the specific quiz is played
          }
        } catch (error) {
          console.error('Error checking quiz status:', error);
        }
      }
    };

    checkQuizPlayed();
  }, [userId]);

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
      setSubmitDisabled(false); // Enable submit button once a match is made
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
    correctCount = newCorrectCount;
    setSubmitDisabled(true); // Disable submit button when matches are checked
    endQuizRoute();
  };

  const endQuizRoute = async (finalScore) => {
    console.log("score=" + correctCount);
    try { 
      if (userId) {
        const userRef = doc(db, 'et4s_main', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const currentTotalScore = parseInt(userData.totalscore, 10) || 0;
          const xp = parseInt(userData.xp, 10) || 0;
          const quizScores = userData.Quizscore || [];
          const totalQuestions = parseInt(userData.totalQuestions, 10) || 0;
          const hasPlayedQuizzes = userData.hasPlayedQuizzes || {};
  
          const totalCorrect = currentTotalScore + correctCount;
          const XP = (correctCount * 100) - (powerUpCount * 100);
          const newTotalQuestions = totalQuestions + questions.length;
          const newAccuracy = totalQuestions ? (totalCorrect / newTotalQuestions) * 100 : 0; // Avoid division by zero
  
          quizScores.push(correctCount); // Add the new score to the array
          hasPlayedQuizzes[quizID] = true; // Update the specific quiz ID to true
  
          await updateDoc(userRef, {
            totalscore: (currentTotalScore + correctCount).toString(),
            Quizscore: quizScores,
            xp: xp + XP,
            accuracy: newAccuracy, // Update the accuracy in Firestore
            totalQuestions: newTotalQuestions, // Update total questions in Firestore
            hasPlayedQuizzes: hasPlayedQuizzes // Update the map with the quiz ID
          });
        }
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
    alert(`Quiz Ended! Your Score: ${correctCount}`);
    resetQuiz();
  };

  const resetQuiz = () => {
    correctCount = 0;
    props.handleEnding();
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
      context.strokeStyle = match.automated ? "#00ff00" : "#ffffff";
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
      powerUpCount++;
    }
  };

  const handleGiveAnswer = () => {
    if (!giveAnswerUsed) {
      powerUpCount++;
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

  const handlePlusSignHover = () => {
    setIsHoveringPlusSign(true);
    setPopupMessage("Want extra time? Here's a gift from us!");
  };

  const handlePlusSignLeave = () => {
    setIsHoveringPlusSign(false);
    setPopupMessage("");
  };
  const toggleDoc = () => setShowDoc(!showDoc);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (quizPlayed) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        background: `url('https://images.pexels.com/photos/2303101/pexels-photo-2303101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') no-repeat center center`,
        backgroundSize: 'cover',
        color: '#fff',
        fontFamily: `'Space Mono', monospace`,
        padding: '20px'
      }}>
        <div>
          <h2 style={{
            fontSize: '3rem',
            marginBottom: '20px',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
          }}>
            You've already completed this mission.
          </h2>
          <p style={{
            fontSize: '1.5rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)'
          }}>
            You've already completed this mission.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '30px',
              fontSize: '1.2rem',
              textDecoration: 'none',
              color: '#1e90ff',
              border: '2px solid #1e90ff',
              padding: '10px 20px',
              borderRadius: '5px',
              transition: 'background-color 0.3s, color 0.3s',
              display: 'inline-block',
              backgroundColor: 'transparent',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1e90ff';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#1e90ff';
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="match-questions min-h-screen flex flex-col ">
      <div className="">
      <div className="position">
        <span></span>
      <div className="position">
        <span>  ⌛Time Left: {formatTime(timeLeft)}</span>
    </div>

</div>
        <div className="power-ups m-5">
          <button
            className="powerup-btn"
            onClick={handleAddTime}
            disabled={addTimeUsed}
            onMouseEnter={handlePlusSignHover}
            onMouseLeave={handlePlusSignLeave}
          >
           ⏰
          </button>
          <button
            className="powerup-btn"
            onClick={handleGiveAnswer}
            disabled={giveAnswerUsed}
          >
            💡
            {isHoveringQuestionMark && <div className="tooltip">{popupMessage}</div>}
          </button>
          <button className="powerup-btn" onClick={toggleDoc}>
           ❓
          </button>
          <DocumentationModal show={showDoc} onClose={toggleDoc} />

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
      {!quizPlayed && (
        <div className="check-btn-container">
          <button id="submit" className="check-btn" onClick={handleCheckMatches} disabled={submitDisabled}>
            &#x2192;
          </button>
        </div>
      )}
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



export default A_MatchPage;

