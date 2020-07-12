import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './Routers/AppRouter';




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// npm install react-app-polyfill core-js

// // in App.js or main file

// import 'react-app-polyfill/stable';