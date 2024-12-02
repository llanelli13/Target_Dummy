import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Ton fichier CSS ou Tailwind
import App from './App'; // Ton fichier App.js
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
