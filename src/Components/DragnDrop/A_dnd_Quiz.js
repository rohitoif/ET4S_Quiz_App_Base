import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import Question from './dnd_Questions.js';
import { db, updateDoc, doc, getDoc } from '../../firebase.js'; // Import Firestore functions
import { useUser } from '../../UserContext.js';

const questions = [
  {
    id: 1, text: 'React is a ___ library.', options: ['JavaScript', 'Python', 'Ruby', 'Java'], answer: 'JavaScript'
  },
  { id: 2, text: 'The capital of India is ___.', options: ['Berlin', 'Delhi', 'Paris', 'Rome'], answer: 'Delhi' },
  {
    id: 3,
    text: 'Which one is a star?',
    options: [
      { type: 'image', src: 'https://images.pexels.com/photos/20337608/pexels-photo-20337608/free-photo-of-saturn-planet-and-rings.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'saturn' },
      { type: 'image', src: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'earth' },
      { type: 'image', src: 'https://images.pexels.com/photos/87611/sun-fireball-solar-flare-sunlight-87611.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'sun' },
      { type: 'image', src: 'https://images.pexels.com/photos/12498752/pexels-photo-12498752.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'jupiter' }
    ],
    answer: 'sun'
  }
];

let score = 0;
const quizID = 1;
const A_DndPage = (props) => {
  const { userId } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // Set initial time (e.g., 300 seconds for 5 minutes)
  const [quizPlayed, setQuizPlayed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current location


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
  }, [userId, quizID]);

  useEffect(() => {
    if (quizPlayed) return; // Stop timer if quiz is already played

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      endQuizRoute(score);
    }
  }, [timeLeft, quizPlayed]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSubmission = (isCorrect) => {
    if (isCorrect) score++;
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      endQuizRoute(score);
    }
  };

  const endQuizRoute = async (finalScore) => {
    try {
      if (userId) {
        const userRef = doc(db, 'et4s_main', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const currentTotalScore = parseInt(userData.totalscore, 10) || 0;
          const xp = parseInt(userData.xp, 10) || 0;
          const quizScores = userData.Quizscore || [];
          const hasPlayedQuizzes = userData.hasPlayedQuizzes || {};

          quizScores.push(finalScore); // Add the new score to the array
          hasPlayedQuizzes[quizID] = true; // Update the specific quiz ID to true in hasPlayedQuizzes map

          await updateDoc(userRef, {
            totalscore: (currentTotalScore + finalScore).toString(),
            Quizscore: quizScores,
            xp: xp + finalScore * 100,
            hasPlayedQuizzes: hasPlayedQuizzes, // Update the map with the quiz ID
          });
        }
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
    alert(`Quiz Ended! Your Score: ${finalScore}`);
    resetQuiz();
  };

  const resetQuiz = () => {
    score = 0;
    props.handleEnding();
  };

  const handlePowerUp = () => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const currentOptions = questions[currentQuestionIndex].options;
    const incorrectOptions = currentOptions.filter(option => {
      if (typeof option === 'object') {
        return option.alt !== correctAnswer;
      } else {
        return option !== correctAnswer;
      }
    });

    if (incorrectOptions.length > 0) {
      const remainingOptions = currentOptions.filter(option => {
        if (typeof option === 'object') {
          return option.alt === correctAnswer || option.alt !== incorrectOptions[0].alt;
        } else {
          return option === correctAnswer || option !== incorrectOptions[0];
        }
      });

      questions[currentQuestionIndex].options = remainingOptions;
    }
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
            You've Launched This Quiz Before!
          </h2>
          <p style={{
            fontSize: '1.5rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)'
          }}>
            🚀 You've already completed this mission. Try exploring other quizzes to continue your space adventure!
          </p>
          <button
            onClick={() => navigate(location.state?.from || '/')}
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
    <div className="quiz">
      <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      <Question
        key={currentQuestionIndex}
        question={questions[currentQuestionIndex]}
        onSubmit={handleAnswerSubmission}
        onPowerUp={handlePowerUp}
      />
      {/* Add similar button here if needed */}
    </div>
  );
};

export default A_DndPage;