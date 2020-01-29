import React from 'react';
import logo from './logo.svg';
import {AdobeDisabled} from '../src/components/AdobeDisabled'
import './App.scss';
import { PrinterRemoval } from './components/Printer';
import Routes from './routes/routes'
import { BrowserRouter, Link,withRouter } from 'react-router-dom';
import { TreeGraph } from './components/Tree';
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar></Navbar>

     
     
      
      <div style={{marginTop:'30px'}}>
      <Routes></Routes>
      </div>
      

   
      
      
     
    </div>
    </BrowserRouter>
  );
}

export default App;
