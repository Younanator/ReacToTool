import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import {urlHeader} from '../../config/config'
import { toast } from 'react-toastify';




export const PrinterRemoval = () => {
    
    const [output, setOutput] = useState([])
    const [error,setErr] = useState('')
    const [spinner,setSpinner] = useState(false)
    
    const getDisabledUsers = async () => {
        try {
            setSpinner(true)
            const users = await Axios.get(`${urlHeader}/PrinterRemoval`)
            setOutput(users.data)
            setSpinner(false)
        } catch (error) {
            console.log(error)
            toast('Check the script output',{type:'success'})
            setSpinner(false)
        }
    }

    useEffect(() => {

    },[spinner])
   
    return (
        <div style={{display:'flex',wordBreak:'break-word',flexDirection:'row'}} onClick={() => getDisabledUsers()}>
            <div style={{display:'flex',flexDirection:'column'}}>
        Printer Removal
        {spinner ? <div>Loading...</div>:null}
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

  