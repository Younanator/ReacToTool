import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Navbar from './components/Navbar';
import { Username } from './components/User';
import Routes from './routes/routes';
import {Provider} from 'react-redux'
import {store} from './redux/store'
import Skeleton from 'react-loading-skeleton';

function App() {
  const [loading, setloading] = useState(true)
  
  useEffect(() => {
    
    setloading(false)
  }, [])
  return (
    !loading 
    ? <Provider store={store}>
    <BrowserRouter>
    <div style={{display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <Navbar></Navbar>
         
     
      <div style={{display:'flex',margin:'auto',width:'20%',backgroundColor:'#8e8eda',justifyContent:'center',borderRadius:'5px',color:'white'}}>
      <Username></Username>
      </div>
      
      
       
      <Routes></Routes>
      
      <ToastContainer></ToastContainer>
    </div>
    </BrowserRouter>
    </Provider>
  : 
  <div>
    <Skeleton height={200} width ={150}></Skeleton>
  </div>
  
  );
}

export default App;
