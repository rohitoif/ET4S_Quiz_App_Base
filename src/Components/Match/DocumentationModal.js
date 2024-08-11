const DocumentationModal = ({ show, onClose }) => {
    if (!show) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>This is the documentation for the Match the Columns game.</p>
          <ul>
            <li>Match the questions on the left with the correct answers on the right.</li>
            <li>You have a limited time to complete the game.</li>
            <li>You can use power-ups to get hints or extra time.</li>
          </ul>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  export default DocumentationModal;