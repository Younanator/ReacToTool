import React from 'react';
import logo from './logo.svg';
import {AdobeDisabled} from '../src/components/AdobeDisabled'
import './App.scss';
import { PrinterRemoval } from './components/Printer';
import Routes from './routes/routes'
import { BrowserRouter, Link,withRouter } from 'react-router-dom';
import { TreeGraph } from './components/Tree';
import Navbar from './components/Navbar';
import { Username } from './components/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar></Navbar>

     
     
      <Username></Username>
      <div style={{marginTop:'30px'}}>
      <Routes></Routes>
      </div>
      <ToastContainer></ToastContainer>
    </div>
    </BrowserRouter>
  );
}

export default App;
