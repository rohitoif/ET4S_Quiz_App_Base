import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App1';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';
import Footer from './Components/Footer';
import MiniDrawer from './Components/Drawer';
import Home from './Components/Home';
import Feedback from './Components/Feedback';
import Header from './Components/Header';
import MCQPage from './Components/MCQ/MCQPage';
import Quizzes from './Quizzes';
import DndPage from './Components/DragnDrop/dnd_Quiz';
import './App.css'; // Make sure this path is correct based on your project structure
import MatchQuestions from './Components/Match/MatchQuestions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MatchPage from './Components/Match/MatchQuestions';

// lib/utils.ts
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { BrowserRouter } from 'react-router-dom';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function MyPage() {
  const [curPage, setPage] = useState(0); // Initialize curPage state with 0
  const [quizMode, setQuizMode] = useState(0);
  const [quizPage, setQuizPage] = useState(null);
  // Function to handle page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleQuizPage = (newQuiz) => {
    setQuizMode(1);
    setQuizPage(newQuiz);
  };

  if(quizMode===0) {
  return (
    <div className="main-container">
      <Header />
      <MiniDrawer setPage={handleChangePage} curPage={curPage} />
      <div className="content w-fill">
        {curPage === 0 && (
          <React.StrictMode>
            <Home />
          </React.StrictMode>
        )}
        {curPage === 1 && (
          <React.StrictMode>
            <br />
            <App setQuizPage={handleQuizPage}/>
          </React.StrictMode>
        )}
        {curPage === 2 && (
          <React.StrictMode>
            <br />
            <h1>My Activities</h1>
            <App2 />
          </React.StrictMode>
        )}
        {curPage === 3 && (
          <React.StrictMode>
            <br />
            <h1>Feedback and Suggestions</h1>
            <Feedback />
          </React.StrictMode>
        )}
        {/* Add more conditions as needed for other pages */}
      </div>     
      <Footer />
    </div>
  );
}

else if (quizMode ===1){
  return (
    <div>
        {quizPage === 0 && (
          <React.StrictMode>
            <MCQPage />
          </React.StrictMode>
        )}

          {quizPage === 1 && (
          <React.StrictMode>
            <DndProvider backend={HTML5Backend}>
            <DndPage/>
            </DndProvider>
          </React.StrictMode>
        )}

          {quizPage === 2 && (
          <React.StrictMode>
            <br />
            <MatchPage />
          </React.StrictMode>
          )}
    </div>
  );
}

/*{quizPage === 1 && (
          <React.StrictMode>
            <br />
            <DndPage/>
          </React.StrictMode>
        )}
        {quizPage === 2 && (
          <React.StrictMode>
            <br />
            <MatchPage />
          </React.StrictMode>
        )}
  );*/


}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyPage />
    </BrowserRouter>
  </React.StrictMode>
);
