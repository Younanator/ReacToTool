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
    <div style={{display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <Navbar></Navbar>
         
     
      <div style={{display:'flex',margin:'auto',width:'28%',backgroundColor:'#8e8eda',justifyContent:'center',borderRadius:'5px',color:'white'}}>
      <Username></Username>
      </div>
      
      
       
      <Routes></Routes>
      
      <ToastContainer></ToastContainer>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
