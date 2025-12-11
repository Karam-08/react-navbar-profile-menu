import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {navLinks} from './data/links';

import Navbar from './components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar navLinks={navLinks}/>
  </React.StrictMode>
);