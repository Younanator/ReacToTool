import React from 'react';
import logo from './logo.svg';
import {AdobeDisabled} from '../src/components/AdobeDisabled'
import './App.css';
import { PrinterRemoval } from './components/Printer';

function App() {
  return (
    <div className="App">
      <h1>Winc Tool</h1>
      <div style={{flexDirection:'column',display:'flex',marginTop:'30px'}}>
      <AdobeDisabled></AdobeDisabled>
      <PrinterRemoval></PrinterRemoval>
      </div>
    </div>
  );
}

export default App;
