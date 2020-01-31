import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import {urlHeader} from '../config/config'




export const UnlockUser = () => {
    
    const [output, setOutput] = useState('')
    const [error,setErr] = useState('')
    const [spinner,setSpinner] = useState(false)
    const [user,setUser] = useState('')
    
    const getDisabledUsers = async () => {
        try {

            setSpinner(true)
            const users = await Axios.get(`${urlHeader}/UnlockAD`,{
                params: {
                  user
                }            
            })

            setOutput(users.data)
            setSpinner(false)
        } catch (error) {       
            setErr(error.data)
            setSpinner(false)
    }
}

    useEffect(() => {

    },[spinner])
   
    return (
        <div style={{display:'flex',wordBreak:'break-word',flexDirection:'row'}}>
         <div className="rowFlex">
             <p>Enter username for Unlocking - Not working</p>
             <input onChange={(e) => setUser(e.target.value)}></input> 
             <button onClick={() => getDisabledUsers()} >Submit</button>
             {spinner ? <p>Loading...</p> : null}
         </div>
         {output}
        {error}
        </div>
    )
  }

  