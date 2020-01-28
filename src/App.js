import React from 'react';
import logo from './logo.svg';
import {AdobeDisabled} from '../src/components/AdobeDisabled'
import './App.css';
import { PrinterRemoval } from './components/Printer';

function App() {
  return (
    <div className="App">
      <AdobeDisabled></AdobeDisabled>
      <PrinterRemoval></PrinterRemoval>
    </div>
  );
}

export default App;
