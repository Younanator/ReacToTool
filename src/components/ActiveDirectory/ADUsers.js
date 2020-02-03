
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
            
            setUnlockSpinner(true)
            const users = await Axios.get(`${urlHeader}/UnlockAD`,{
                params: {
                  user
                }            
            })
            
            
            users.data.includes(" is not locked")
            ? toast(users.data,{type:'warning'})
            : toast(users.data,{type:"success"})
            
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
            <input value={user} onChange={(e) => setUser(e.target.value)} type="text"  placeholder="User name" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <button onClick={() => UnlockUser()} type="button" class="btn btn-primary">Unlock Account</button>
            {unlockSucc}
            {unlockSpinner ? <p>...Unlocking</p> : null}
            <RDPSccm></RDPSccm>
            
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


 export const RDPSccm = () => {
    const [computer,setComp] = useState('')
    const [resp,setResp] = useState('')
    const [user,setUser] = useState('')
    const userList = useSelector(state => state.ActiveDirectory.users)
    const [computers,setComps] = useState([])
    
    
    const RDPSess = async () => {
        try {
            
            const users = await Axios.get(`${urlHeader}/RDP`,{
                params:{
                    computer
                }
            })

            setResp(users.data)
           
        } catch (error) {
             setResp('Error')
        }
    }

    const RemoteSess = async () => {
        try {
            
            const data = await Axios.get(`${urlHeader}/Remote`,{
                params:{
                    computer
                }
            })

            setResp(data.data)
           
        } catch (error) {
             toast()
        }
    }

    
    const UserComputer = async () => {
        try {

            const data = {
                user
            }
            
            const sccmUsers = await Axios(`${urlHeader}/SccmUsers`,{
                method:'GET',
                withCredentials:true,
                params:data
            })
            
            setComp(sccmUsers.data)
            
        } catch (error) {
            toast('Error grabbing SCCM user',{type:"error"})
        }
    }
    
    useEffect(() => {
        
    },[userList])

    return (
        <div>
           
        <div className="rowFlex">
        <input value={computer} onChange={(e) => setComp(e.target.value)}></input>
        <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   Connect
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a onClick={() => RDPSess() } class="dropdown-item" href="#">RDP</a>
    <a  onClick={() => RemoteSess() }class="dropdown-item" href="#">Remote</a>
  </div>
    </div>
        </div>
        {resp}
        <div className="rowFlex">
        <input value={user} onChange={(e) => setUser(e.target.value)} type="text"  placeholder="User name" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        <button onClick={() => UserComputer()}>Get Computers</button>
        </div>
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

