// DocumentationModal.js
import React from 'react';

function DocumentationModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>HOW TO PLAY</h2> <br /> 
        <br />
        <p>
          Welcome to Match the Following, a stop at your ultimate space adventure! 🌌 Your mission is to match each question with the correct answer.<br />
          <br />Simply click on a question from the left column and then choose the matching answer from the right column. But that’s not all— our quiz is packed with interstellar power-ups to help you along your journey: < br />
          <br/> ⏰ Time Extender: If you're running low on time and need a bit more to figure out your answers, just click the clock icon. This will give you extra seconds on the timer, so you can take your time and make sure you choose the right answers. <br/ >
          <br/>💡 Hint Generator: Feeling lost? Tap the lightbulb for a helpful hint that will guide you toward the right answer. It's like getting a little nudge in the right direction! < br/>
          <br/> Click the purple arrow button on the bottom when you are done with the quiz! <br/>
          <br/>
          <br/> ALL THE BEST RANGER! 
        </p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default DocumentationModal;
