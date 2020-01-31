import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import {urlHeader} from '../config/config'

export const AdobeDisabled = () => {
    
    const [output, setOutput] = useState([])
    const [error,setErr] = useState('')
    const [spinner,setSpinner] = useState(false)

    const getDisabledUsers = async () => {
        try {
            setSpinner(true)
            const users = await Axios.get(`${urlHeader}/Adobe`)
            setOutput(users.data)
            setSpinner(false)
        } catch (error) {
            setSpinner(false)
            
            setErr('Error')
        }
    }
   
    useEffect(() => {

    },[spinner])

    return (
        <div style={{display:'flex',flexDirection:'row'}}>
            <p>For this function to work, you need to go to the Adobe Admin and export a list of users to your documents folder. To do so, just go to the users tab</p>
        <button style={{}} onClick={() => getDisabledUsers()}>Find all Missing Adobe users</button>
        
        {spinner ? <div>Loading...</div>: null}
       <div style={{display:'flex',flexDirection:'column'}}>
        {output.map(e => {
            return(
                <div>
                    {e}
               </div>
            )
        })}
        </div>
        {error}
        </div>
    )
  }

