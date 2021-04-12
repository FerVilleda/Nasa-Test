import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

import FotosProvider from './context/FotosProvider'
import URLProvider from './context/URLProvider';


ReactDOM.render(
  <React.StrictMode>
    <URLProvider>
      <FotosProvider>
        <App />
      </FotosProvider>
    </URLProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);


