//Angel Cazares
//ajc253@njit.edu
//IT302-452
//     4/14/25
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/ajc253">
    <App />
  </BrowserRouter>
);
