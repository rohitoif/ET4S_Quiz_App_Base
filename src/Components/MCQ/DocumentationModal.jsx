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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">HOW TO PLAY</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Welcome to Match the Following, a stop at your ultimate space adventure! 🌌 Your mission is to match each question with the correct answer.
            </p>
            <p>
              Simply click on a question from the left column and then choose the matching answer from the right column. But that's not all— our quiz is packed with interstellar power-ups to help you along your journey:
            </p>
            <p>
              <span className="font-semibold">⏰ Time Extender:</span> If you're running low on time and need a bit more to figure out your answers, just click the clock icon. This will give you extra seconds on the timer, so you can take your time and make sure you choose the right answers.
            </p>
            <p>
              <span className="font-semibold">💡 Hint Generator:</span> Feeling lost? Tap the lightbulb for a helpful hint that will guide you toward the right answer. It's like getting a little nudge in the right direction!
            </p>
            <p>
              Click the purple arrow button on the bottom when you are done with the quiz!
            </p>
            <p className="font-bold text-purple-700">
              ALL THE BEST RANGER!
            </p>
          </div>
        </div>
        <div className="bg-gray-100 px-6 py-4 flex justify-end">
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentationModal;