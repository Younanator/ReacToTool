import React from 'react';
import logo from './logo.svg';
import {AdobeDisabled} from '../src/components/AdobeDisabled'
import './App.css';
import { PrinterRemoval } from './components/Printer';
import Routes from './routes/routes'
import { BrowserRouter, Link } from 'react-router-dom';
import { TreeGraph } from './components/Tree';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Winc Tool</h1>
      <div  style={{display:'flex',flexDirection:'row'}}>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around'}}> 
       <Link to="/Active"> Active Directory</Link>
       <Link to="/"> SCCM</Link>
       <Link to="/Adobe"> Adobe</Link>
      </div>
      <div style={{flexDirection:'column',display:'flex',marginTop:'30px'}}>
      <Routes></Routes>
      </div>
      <TreeGraph></TreeGraph>

      </div>
      
      
     
    </div>
    </BrowserRouter>
  );
}

export default App;
