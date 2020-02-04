import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Navbar from './components/Navbar';
import { Username } from './components/User';
import Routes from './routes/routes';
import {Provider} from 'react-redux'
import {store} from './redux/store'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div>
      <Navbar></Navbar>

     
      <div style={{display:'flex',margin:'auto',width:'20%',backgroundColor:'#8e8eda',justifyContent:'center'}}>
      <Username></Username>
      </div>
      
      <div style={{marginTop:'30px'}}></div>
       
      <Routes></Routes>
      
      <ToastContainer></ToastContainer>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
