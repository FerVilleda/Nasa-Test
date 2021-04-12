import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

import FotosProvider from './context/FotosProvider'



ReactDOM.render(
  <React.StrictMode>
   
      <FotosProvider>
        <App />
      </FotosProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


