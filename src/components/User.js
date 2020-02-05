import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import {urlHeader} from '../config/config'




export const Username = () => {
     
    const [username,setUser] = useState('None')

    useEffect(() => {
        const userStorage = localStorage.getItem('username')
        console.log(userStorage)
        if(userStorage !== null){
          setUser(localStorage.getItem('username'))
        } 
    },[username])

    return (
        <div>
         {username !== 'None' ? <div>{username}</div> : <AddUsername></AddUsername>}
        </div>
    )
  }

  const AddUsername = () => {
    const [username,setUser] = useState('')

    const addUser = () => {
        localStorage.setItem('username',username)
        window.location.reload()
    }

     return (
         <div className="rowFlex">
        <p></p><input placeholder="Enter network username" onChange={(e) => setUser(e.target.value)}></input>
        <button onClick={() => addUser()}>Set username</button>
         </div>
    )
  }
  