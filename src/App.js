import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'
import {urlHeader} from './config/config'

function App() {

  return (
    <div className="App">
      <p onClick={() => Axios.get(`${urlHeader}/makers`)}>Add call</p>
    </div>
  );
}

export default App;
