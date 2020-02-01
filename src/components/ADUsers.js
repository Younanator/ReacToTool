

import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import {urlHeader} from '../config/config'
import { toast } from 'react-toastify';

export const ADUser = () => {
    
    const [output, setOutput] = useState([])
    const [error,setErr] = useState('')
    const [spinner,setSpinner] = useState(false)

    const getDisabledUsers = async () => {
        try {
            setSpinner(true)
            const users = await Axios.get(`${urlHeader}/GetUsers`)
            setOutput(users.data)
            setSpinner(false)
        } catch (error) {
            setSpinner(false)
            console.log(error)
            setErr(error)
        }
    }
   
    useEffect(() => {

    },[spinner])

    return (
        <div style={{display:'flex',wordBreak:'break-word',flexDirection:'row'}}>
        <p style={{}} onClick={() => getDisabledUsers()}>Find 50 AD Users</p>
       
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

export const DropdownUsers = () => {

    const [userList,setUsers] = useState([])
    const [err,setErr] = useState('')
    const [filList,setFil] = useState([])
    const [unlockSpinner,setUnlockSpinner] = useState(false)
    const [getUsersSpinner,setUsersSpinner] = useState(false)
    const [user,setUser] = useState('')
    const [unlockSucc,setUnlockSucc] = useState('')
    
    const UnlockUser = async () => {
        try {
            setUnlockSucc('')
            setUnlockSpinner(true)
            const users = await Axios.get(`${urlHeader}/UnlockAD`,{
                params: {
                  user
                }            
            })
            
            toast(users.data,{type:'success'})
            setUnlockSucc(users.data)
            setUnlockSpinner(false)
        } catch (error) {       
            setErr(error.data)
            setUnlockSpinner(false)
    }
}

    const getUsers = async () => {
        try {
            setUsersSpinner(true)
            const users = await Axios.get(`${urlHeader}/AllUsers`)
            console.log(users.data)
            
            setUsers(users.data)
            setUsersSpinner(false)
        } catch (error) {
            setErr('Couldnt fetch users')
            setUsersSpinner(false)
        }
    }

    useEffect(() => {
        if(userList.length === 0){
            getUsers()
        }
    },[userList])

    return(
        <div>
            <div className="rowFlex">
            <input value={user} onChange={(e) => setUser(e.target.value)} type="text" class="form-control" placeholder="User name" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            
            <button onClick={() => UnlockUser()}>Unlock Account</button>
            {unlockSucc}
            {unlockSpinner ? <p>...Unlocking</p> : null}
            </div>
            {getUsersSpinner ? <p>...Grabbing users</p> : null}
            {userList.filter(e => {
                return e.name.toLowerCase().indexOf(user.toLowerCase()) >= 0
            }).map(e => {
                return (
                    
                        <div onClick={() => setUser(e.samAcc)}>
                            {e.name}
                            <hr></hr>
                        </div>
                )
            })}
        </div>
    )
}
