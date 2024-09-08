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
  //const [dialogOpen, setDialogOpen] = useState(false); // Set to true to open initially

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
      hackUsed = true;
    }
  };

  const handleHint = () => {
    setHint(`Hint: The correct answer is ${question.answer}`);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
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

      {/* Scrollable Dialog Box */}
      <Dialog open={dialogOpen} onClose={toggleDialog} 
        PaperProps={{ 
          style: { 
            position: 'fixed', 
            right: 0, 
            maxHeight: '90vh', 
            width: '30vw', 
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(5px)',
            color: 'white',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            boxShadow: '0px 0px 20px 5px rgba(142, 45, 226, 0.5)', 
            borderRadius: '10px',
          }
        }}>
        <DialogTitle style={{ borderBottom: '1px solid #8e2de2', fontWeight: 'bold' }}>Documentation</DialogTitle>
          <DialogContent dividers={true} style={{ overflowY: 'scroll', padding: '20px' }}>
            <h2 style={{ color: '#8e2de2' }}>🎯 Quiz Instructions</h2>
            
            <h3 style={{ color: '#8e2de2' }}>📚 How to Drag and Drop</h3>
            <p>
              To answer questions, simply drag the correct option from the list and drop it into the designated area. For table-based questions, drag the options to the corresponding cells. This interactive feature helps you engage with the quiz in a dynamic way!
            </p>
            
            <h3 style={{ color: '#8e2de2' }}>⚡️ Power-Ups</h3>
            <p>
              <strong>Hack 🛠:</strong> Instantly reveal the correct answer and get a boost to your score!
            </p>
            <p>
              <strong>Hint 💡:</strong> Get a helpful hint to guide you towards the correct answer.
            </p>
            

            <h3 style={{ color: '#8e2de2' }}>🔍 Additional Tips</h3>
            <p>
              Use power-ups wisely to enhance your quiz experience. Each power-up can turn the tide in your favor, so think strategically about when to use them!
            </p>
          </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} style={{ color: '#8e2de2' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Question;
