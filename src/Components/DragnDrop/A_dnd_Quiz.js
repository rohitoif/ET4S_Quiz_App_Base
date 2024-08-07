import React, { useState, useEffect } from 'react';
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

const A_DndPage = (props) => {
  const { userId } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // Set initial time (e.g., 300 seconds for 5 minutes)


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      endQuizRoute(score);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSubmission = (isCorrect) => {
    console.log("score_before :", score);
    if (isCorrect) score++;
    console.log("score_after :", score);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      endQuizRoute(score);
      document.getElementById("submit").disabled = true;
    }
  };

  const endQuizRoute = async (finalScore) => {
    console.log("score=" + finalScore);
    try {
      if (userId) {
        const userRef = doc(db, 'et4s_main', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const currentTotalScore = parseInt(userDoc.data().totalscore, 10);
          const xp = parseInt(userDoc.data().xp, 10);
          const quizScores = userDoc.data().Quizscore || [];
          const XP = (finalScore * 100);
          quizScores.push(finalScore); // Add the new score to the array

          await updateDoc(userRef, {
            totalscore: (currentTotalScore + finalScore).toString(),
            Quizscore: quizScores, // Update the array with the new score
            xp: xp + XP
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

  return (
    <div className="quiz">
      <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      <Question
        key={currentQuestionIndex}
        question={questions[currentQuestionIndex]}
        onSubmit={handleAnswerSubmission}
        onPowerUp={handlePowerUp}
      />
    </div>
  );
};

export default A_DndPage;
