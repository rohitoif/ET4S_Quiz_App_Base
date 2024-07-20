import React, { useState } from 'react';
import Question from './Question';

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

const Quiz = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerSubmission = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      onComplete(score + 1);
    }
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
      <Question
        key={currentQuestionIndex}
        question={questions[currentQuestionIndex]}
        onSubmit={handleAnswerSubmission}
        onPowerUp={handlePowerUp}
      />
    </div>
  );
};

export default Quiz;
