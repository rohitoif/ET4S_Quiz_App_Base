import React from 'react';

const Results = ({ score }) => {
  return (
    <div className="results">
      <h2>Your Score: {score}</h2>
      <button onClick={() => window.location.reload()}>Restart</button>
    </div>
  );
};

export default Results;
