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
import './App.css'; // Make sure this path is correct based on your project structure

// lib/utils.ts
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export default function MyPage() {
  const [curPage, setPage] = useState(0); // Initialize curPage state with 0

  // Function to handle page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

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
            <App />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyPage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
/*
setInterval(function() {
  alert("Buck up, buddy! You still got a lot of stuff to do.");
}, 10 * 1000); // 10 seconds
*/