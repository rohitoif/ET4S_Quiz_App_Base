// DocumentationModal.js
import React from 'react';

function DocumentationModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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