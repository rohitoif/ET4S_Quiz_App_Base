import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Option from './dnd_Options';
import './dnd_styles.css';

const Question = ({ question, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [tableAnswers, setTableAnswers] = useState({
    planet: '',
    star: '',
    moon: '',
    comet: ''
  });
  const [options, setOptions] = useState(question.options);
  const [hint, setHint] = useState('');

  useEffect(() => {
    setSelectedOption('');
    setOptions(question.options);
    setTableAnswers({
      planet: '',
      star: '',
      moon: '',
      comet: ''
    });
    setHint(''); // Reset hint when question changes
  }, [question]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'option',
    drop: (item) => {
      setSelectedOption(item.option);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleTableDrop = (item, rowId) => {
    setTableAnswers(prev => ({
      ...prev,
      [rowId]: item.option
    }));
  };

  const [{ isOver: isTableOver }, tableDrop] = useDrop(() => ({
    accept: 'option',
    drop: (item, monitor) => {
      const rowId = monitor.targetId;
      handleTableDrop(item, rowId);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleSubmit = () => {
    let isCorrect = false;

    if (question.table) {
      const correctAnswers = {
        planet: 'Earth',
        star: 'Sun',
        moon: 'Europa',
        comet: 'Halley'
      };
      isCorrect = Object.keys(correctAnswers).every(key => correctAnswers[key] === tableAnswers[key]);
    } else {
      isCorrect = selectedOption === question.answer;
    }

    onSubmit(isCorrect);
  };

  const handleEliminate = () => {
    const correctAnswer = question.answer;
    const incorrectOptions = options.filter(option => option !== correctAnswer);
    if (incorrectOptions.length > 0) {
      const remainingOptions = options.filter(option => option === correctAnswer || option !== incorrectOptions[0]);
      setOptions(remainingOptions);
    }
  };

  const handleHint = () => {
    setHint(`Hint: The correct answer is ${question.answer}`);
  };

  return (
    <div className="question-container">
      <div className="power-ups">
        <button className="power-up-button" onClick={handleEliminate}>Eliminate ❌</button>
        <button className="power-up-button" onClick={handleHint}>Hint 💡 </button>
      </div>
      <div className="hint">{hint}</div>
      <div className="question">
        <p>{question.text}</p>
        {question.table ? (
          <div className="table">
            {question.rows.map((row, index) => (
              <div key={index} className="table-row" id={row.id} ref={tableDrop}>
                <div className="table-label">{row.label}</div>
                <div className={`table-cell ${isTableOver ? 'hover' : ''}`}>
                  {tableAnswers[row.id] || 'Drag answer here'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div ref={drop} className={`drop-zone ${isOver ? 'hover' : ''}`}>
              {selectedOption || 'Drag your answer here'}
            </div>
            <div className="options">
              {options.map((option, index) => (
                <Option key={index} option={option} />
              ))}
            </div>
          </>
        )}
        <button onClick={handleSubmit}>Submit 👍🏻 </button>
      </div>
    </div>
  );
};

export default Question;
