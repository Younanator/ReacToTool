
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import { urlHeader } from '../../config/config'
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export const ADUser = () => {

    const [output, setOutput] = useState([])
    const [error, setErr] = useState('')
    const [spinner, setSpinner] = useState(false)

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

    }, [spinner])

    return (
        <div style={{ display: 'flex', wordBreak: 'break-word', flexDirection: 'row' }}>
            <p style={{}} onClick={() => getDisabledUsers()}>Find 50 AD Users</p>

            {spinner ? <div>Loading...</div> : null}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {output.map(e => {
                    return (
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
    
    const [user, setUser] = useState('')
    const [samAcc, setSam] = useState('')
    const prevUser = usePrevious(samAcc)
    const [closedDrop,setDrop] = useState(false)
    
    const setUsers = (name, samAcc) => {
        setUser(name)
        setSam(samAcc)
        if(!closedDrop)setDrop(true) 
    }

    const setUserStr = (name) => {
        setUser(name)
        if(closedDrop)setDrop(false)  
    }

    const UnlockUser = async () => {
        try {

            toast('Unlocking...', { type: "info" })
            const users = await Axios.get(`${urlHeader}/UnlockAD`, {
                params: {
                    user: samAcc
                }
            })


            users.data.includes(" is not locked")
                ? toast(users.data, { type: 'warning' })
                : toast(users.data, { type: "success" })


        } catch (error) {

            toast(error.data, { type: 'warning' })

        }
    }

    

    return (
        <div style={{ fontSize: '0.75rem',zIndex:1 }}>
            <div className="rowFlex" >
                <input style={{ width: '200px' }} value={user} onChange={(e) => setUserStr(e.target.value)} type="text" placeholder="User name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <button onClick={() => UnlockUser()} type="button" class="btn btn-primary">Unlock Account</button>
            </div>
            {!closedDrop ? <div style={{zIndex:2,position:'absolute',backgroundColor:'red'}}>
            <div style={{width:'200px'}}>
            {
            user.length > 0 ? userList.filter(e => {
                return e.name.toLowerCase().indexOf(user.toLowerCase()) >= 0
            }).map(e => {
                return (

                    <div  key={uuid()} onClick={() => setUsers(e.name, e.samAcc)}>
                        {e.name}
                        <hr></hr>
                    </div>
                )
            }) : null}
            </div>
            
            </div>
            : null}
            <RDPSccm user={samAcc} prevUser={prevUser}></RDPSccm>
            
            
        </div>
    )
}


export const RDPSccm = ({ user, prevUser }) => {
    const [computer, setComp] = useState('')
    const [resp, setResp] = useState('')
    const [fetchComp, setFetchComps] = useState(false)
    const userList = useSelector(state => state.ActiveDirectory.users)
    const [userObj, setUserObj] = useState({})
    const [sendMessage, setsendMessage] = useState('')


    const RDPSess = async () => {
        try {

            const users = await Axios.get(`${urlHeader}/RDP`, {
                params: {
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

             await Axios.get(`${urlHeader}/Remote`, {
                params: {
                    computer
                }
            })
           
            toast(`Connected to ${computer}`)

        } catch (error) {
            toast('Error connecting to computer')
        }
    }




    const UserComputer = async () => {
        try {

            const data = {
                user
            }
            setFetchComps(true)
            const sccmUsers = await Axios(`${urlHeader}/SccmUsers`, {
                method: 'GET',
                withCredentials: true,
                params: data
            })
            setFetchComps(false)
            const stringItem = JSON.stringify(sccmUsers.data)
            console.log(stringItem)
            setComp(sccmUsers.data['Computers'])
            setUserObj(sccmUsers.data)


        } catch (error) {
            setFetchComps(false)
            toast('Error grabbing SCCM user', { type: "error" })
        }
    }

    const sendRemoteMessage = async () => {
        try {

            const info = {
                
            }

            
              await Axios(`${urlHeader}/remoteMessage`, {
                method: 'POST',
                params: {
                    message:sendMessage,
                    computer:computer
                  }
            })
            
            
            toast('sentMessage')


        } catch (error) {
            
            toast(error, { type: "error" })
        }
    }

    useEffect(() => {
        if (prevUser !== user && user !== '') {
            console.log(user)
            UserComputer()
        }
    }, [userList, user, prevUser])

    return (
        <div style={{minHeight:'200px'}} >

            <div>
                <div className="colFlex">
                    <div className="rowFlex">
                        {fetchComp
                            ? <Skeleton width={200} height={100} ></Skeleton>
                            : <div>
                                <textarea style={{ width: '200px' }} value={computer} onChange={(e) => setComp(e.target.value)} rows="4" cols="50" />
                                <div>
                                Send User Message
                                <textarea style={{ width: '200px' }} value={sendMessage} onChange={(e) => setsendMessage(e.target.value)} rows="4" cols="50" />
                                <button onClick={() => sendRemoteMessage()}>Send Message</button>
                                </div>
                            </div>
                        }



                        <div class="dropdown" >
                            <div className="rowFlex"  >
                            
                            {fetchComp
                            ? <Skeleton></Skeleton>
                            : <button  class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Connect
                             </button> 
                        }
                            
                            
                                
                                
                                    <div class="dropdown-menu" style={{maxHeight:'200px',overflowY:'auto'}} aria-labelledby="dropdownMenuButton">
                                        <a onClick={() => RDPSess()} class="dropdown-item" href="#">RDP</a>
                                        <a onClick={() => RemoteSess()} class="dropdown-item" href="#">Remote</a>
                                     
                                    </div>
                                

                            </div>
                            
                            <div>
                            <ManagementItems props={userObj}></ManagementItems>
                            </div>
                            


                        </div>
                    </div>
                </div>
            </div>
            {resp}

        </div>
    )
}


const ManagementItems = ({ props }) => {
    return (
        <div className='colFlex'>
            <div>
                {props["Locked"] !== undefined
                    ? props["Locked"] ? <p style={{ backgroundColor: 'red' }}>Locked</p> : <p>Not Locked</p>
                    : null
                }
            </div>
            <div>
                {props["SAP"]}
            </div>
            <div>
                {props["Title"]}
            </div>
        </div>
    )
}