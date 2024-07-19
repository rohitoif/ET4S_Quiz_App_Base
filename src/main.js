import React from 'react';
import ReactDOM from 'react-dom/client';
import MyPage from './index.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MyPage />
  </React.StrictMode>
);