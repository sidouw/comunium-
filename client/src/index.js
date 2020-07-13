import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './Routers/AppRouter';
import 'react-app-polyfill/stable';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

