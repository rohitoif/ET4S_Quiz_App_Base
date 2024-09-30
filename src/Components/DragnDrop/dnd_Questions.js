import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Option from './dnd_Options';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './dnd_styles.css';



const Question = ({ question, onSubmit, hackUsed, setHackUsed , dialogOpen , setDialogOpen }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [tableAnswers, setTableAnswers] = useState({
    planet: '',
    star: '',
    moon: '',
    comet: ''
  });
  const [options, setOptions] = useState(question?.options || []);
  const [hint, setHint] = useState('');
 // const [dialogOpen, setDialogOpen] = useState(true); // Set to true to open initially

  useEffect(() => {
    setSelectedOption('');
    setOptions(question?.options || []);
    setTableAnswers({
      planet: '',
      star: '',
      moon: '',
      comet: ''
    });
    setHint('');
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

  const handleHack = () => {
    if (!hackUsed) {
      const correctAnswer = question.answer;
      setSelectedOption(correctAnswer);
      setHackUsed(true);
    }
  };

  const handleHint = () => {
    setHint(`Hint: The correct answer is ${question.answer}`);
  };

  const toggleDialog = () => {
    console.log("b4" + dialogOpen)
    setDialogOpen(!dialogOpen);
    console.log("click");
    console.log("after" + dialogOpen);
  };

  return (
    <>
      <Paper elevation={3}
        className="question-container"
        style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid #8e2de2' }}
      >
        <div className="power-ups">
          <button className="power-up-button" onClick={handleHack} disabled={hackUsed}>🛠</button>
          <button className="power-up-button" onClick={handleHint}>💡</button>
          <button className="power-up-button" onClick={toggleDialog}>❓</button>
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
          <button id="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </Paper>
     {
      dialogOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">How to Play</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Welcome to the Quiz, where you have to Drag and Drop. Your mission is to drag the correct answer into the blank space.
            </p>
            <p>
              Click with the left mouse button and drag to the answer space while holding the left mouse button, then release the left mouse button.
            </p>
            <p>
              <span className="font-semibold">🛠 Fix:</span> If you're feeling lost and need some help, just click the fix icon. The Starfire spaceship will give you the correct answer!
            </p>
            <p>
              <span className="font-semibold">💡 Hint Generator:</span> If you're feeling lost and need some help, just click on the Hint icon. The Starfire spaceship will give you a hint
            </p>
            <p>
              Click the purple arrow button on the bottom when you are done with the quiz!
            </p>
            <p className="font-bold text-purple-700">
              Good Luck Astronaut!
            </p>
          </div>
        </div>
        <div className="bg-gray-100 px-6 py-4 flex justify-end">
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={toggleDialog}
          >
            Close
          </button>
        </div>
      </div>
    </div>)}
    </>
  );
}

export default Question;
