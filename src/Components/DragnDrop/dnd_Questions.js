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
          <button className="power-up-button" onClick={handleHack} disabled={hackUsed}>Hack 🛠</button>
          <button className="power-up-button" onClick={handleHint}>Hint 💡</button>
          <button className="power-up-button" onClick={toggleDialog}>Open Documentation 📖</button>
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
