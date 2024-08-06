import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App1';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';
import Footer from './Components/Footer';
import MiniDrawer from './Components/Drawer';
import Home from './Components/Home';
import MissionPlanetHopper from './Components/Feedback';
import Header from './Components/Header';
import MCQPage from './Components/MCQ/MCQPage';
import Quizzes from './Quizzes';
import DndPage from './Components/DragnDrop/dnd_Quiz';
import './App.css'; // Ensure this path is correct based on your project structure
import MatchQuestions from './Components/Match/MatchQuestions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthProvider } from './useAuth';
import MatchPage from './Components/Match/MatchQuestions';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { UserProvider, useUser } from './UserContext';
import { db } from './firebaseConfig'; // Adjust path if needed
import { doc, getDoc } from 'firebase/firestore';

// lib/utils.ts
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function MyPage() {
  const [curPage, setPage] = useState(0);
  const [quizMode, setQuizMode] = useState(0);
  const [quizPage, setQuizPage] = useState(0);
  const [user, setUser] = useState(null);
  const { userId, username, setUsername , rank , setRank , xp , setXp , totalscore , setTotalscore} = useUser(); // Correctly deconstruct all the required values

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, 'et4s_main', userId); // Document ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser(userData);
        setUsername(userData.name);
        setRank(userData.rank);
        setXp(userData.xp);
        setTotalscore(userData.totalscore);
      } else {
        console.log('Cannot Find User!');
      }
    };

    fetchUser();
  }, [userId, setUsername]); // Add dependencies for the effect

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleQuizPage = (newQuiz) => {
    setQuizMode(1);
    setQuizPage(newQuiz);
  };

  const handleEnding = () => {
    setQuizMode(0);
    setPage(1);
  };

  if (quizMode === 0) {
    return (
      <div className="main-container">
        <Header />
        <MiniDrawer setPage={handleChangePage} curPage={curPage} />
        <div className="content w-fill">
          {curPage === 0 && (
            <React.StrictMode>
              <p>Name: {user ? username : 'Loading...'}</p>
              <p>Rank: {user ? rank : 'Loading...'}</p>
              <p>XP: {user ? xp : 'Loading...'}</p>
              <p>Total Score: {user ? totalscore : 'Loading...'}</p>
              <Home />
            </React.StrictMode>
          )}
          {curPage === 1 && (
            <React.StrictMode>
              <br />
              <MissionPlanetHopper setQuizPage={handleQuizPage}/>
            </React.StrictMode>
          )}
          {curPage === 2 && (
            <React.StrictMode>
              <br />
              <App2 />
            </React.StrictMode>
          )}
          {curPage === 3 && (
            <React.StrictMode>
              <br />
              <MissionPlanetHopper setQuizPage={handleQuizPage}/>
            </React.StrictMode>
          )}
        </div>
        <Footer />
      </div>
    );
  } else if (quizMode === 1) {
    return (
      <div>
        {quizPage === 0 && (
          <React.StrictMode>
            <MCQPage handleEnding={handleEnding}/>
          </React.StrictMode>
        )}
        {quizPage === 1 && (
          <React.StrictMode>
            <DndProvider backend={HTML5Backend}>
              <DndPage handleEnding={handleEnding}/>
            </DndProvider>
          </React.StrictMode>
        )}
        {quizPage === 2 && (
          <React.StrictMode>
            <br />
            <MatchPage handleEnding={handleEnding}/>
          </React.StrictMode>
        )}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();



