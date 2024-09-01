import React from 'react';

const DocumentationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Inline styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    overflow: 'hidden',
  };

  const modalContentStyle = {
    background: 'linear-gradient(to bottom right, rgba(128, 0, 128, 0.8), rgba(75, 0, 130, 0.8))',
    paddingTop: '40px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '80vh',
    textAlign: 'center',
    overflowY: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    color: '#fff',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const paragraphStyle = {
    marginBottom: '20px', // Adjust this value as needed
  };

return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button style={closeButtonStyle} onClick={onClose}>
          Close
        </button>
        <h2>Welcome to the MCQ Quiz!</h2>
        <p style={paragraphStyle}>
          This page is designed for you to test your knowledge through a series of multiple-choice questions. 
          You will be presented with a set of questions, and your task is to select the correct answer from the given choices.
        </p>
        <p style={paragraphStyle}>
          Feeling Stuck? You have access to various power-ups that can assist you during the quiz:
        </p>
        <ul>
          <li><strong>💣 Bomb:</strong> Adds extra time to your quiz timer.</li>
          <li><strong>🌠 Asteroid:</strong> Removes an incorrect answer choice.</li>
          <li><strong>🤖 Hacker:</strong> Skips the current question and automatically scores a point.</li>
        </ul>
        <p style={paragraphStyle}>
          Make sure to use them wisely! Your score will be calculated based on the number of correct answers.
        </p>
        <p style={paragraphStyle}>🚀 Get ready to boost your knowledge and have fun! Start the quiz now and aim for the stars! 🌟</p>
        <p style={paragraphStyle}>ALL THE BEST RANGER!</p>
      </div>
    </div>
  );
};

export default DocumentationModal;
