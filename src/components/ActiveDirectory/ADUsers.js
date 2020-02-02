
import { shallowEqual, useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import {urlHeader} from '../../config/config'
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

    const userList = useSelector(state => state.ActiveDirectory.users)

    const dispatch = useDispatch();
    const [err,setErr] = useState('')
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

    const getUsers = () => dispatch => {
        
            setUsersSpinner(true)
             Axios.get(`${urlHeader}/AllUsers`).then(resp => {
                dispatch({type: 'GET_USERS', payload:resp.data})
                setUsersSpinner(false)
                
             },err => {
                setErr('Couldnt fetch users')
                setUsersSpinner(false)
             })
        
    }

    useEffect(() => {
        if(userList.length === 0){
            dispatch(getUsers())
        }
    },[userList,dispatch])

    return(
        <div style={{width:'50%'}}>
            <div className="rowFlex" >
            <input value={user} onChange={(e) => setUser(e.target.value)} type="text" class="form-control" placeholder="User name" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <button onClick={() => UnlockUser()} type="button" class="btn btn-primary">Unlock Account</button>

            {unlockSucc}
            {unlockSpinner ? <p>...Unlocking</p> : null}
            </div>
            {getUsersSpinner ? <p>...Grabbing users</p> : null}
            {user.length > 0 ? userList.filter(e => {
                return e.name.toLowerCase().indexOf(user.toLowerCase()) >= 0
            }).map(e => {
                return (
                    
                        <div key={uuid()} onClick={() => setUser(e.samAcc)}>
                            {e.name}
                            <hr></hr>
                        </div>
                )
            }): null}
        </div>
    )
}
