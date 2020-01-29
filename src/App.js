import React from 'react';
import logo from './logo.svg';
import {AdobeDisabled} from '../src/components/AdobeDisabled'
import './App.scss';
import { PrinterRemoval } from './components/Printer';
import Routes from './routes/routes'
import { BrowserRouter, Link } from 'react-router-dom';
import { TreeGraph } from './components/Tree';


function App() {
  return (
    <BrowserRouter>
    <div>
    <div class="all">
<div class="lefter">
<div class="text"><Link to="/Tree">Tree</Link></div>
</div>
<div class="left">
  <div class="text"><Link to="/Active">Active Directory</Link></div>
</div>
<div class="center">
  <div class="explainer"><span>Navigation</span></div>
</div>
<div class="right">
  <div class="text"><Link to="/"> SCCM</Link></div>
</div>
<div class="righter">
  <div class="text"><Link to="/Adobe"> Adobe</Link></div>
</div>
</div>

     
      <div  style={{display:'flex',flexDirection:'row'}}>
      <div style={{display:'flex',flexDirection:'column',backgroundColor:'grey'}}> 
       
       
       
      </div>
      <div style={{flexDirection:'column',display:'flex',marginTop:'30px'}}>
      <Routes></Routes>
      </div>
      

      </div>
      
      
     
    </div>
    </BrowserRouter>
  );
}

export default App;
