import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import { urlHeader } from '../../../config/config'
import { toast } from 'react-toastify';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';



export const FilePermissions = () => {

  const [fileName, setFName] = useState('')
  

  return (
    <div>
      <div >
        <input value={fileName} onChange={(e) => setFName(e.target.value)}></input>
        <FetchFilePermissions path={fileName}></FetchFilePermissions>
      </div>

    </div>
  )
}

const FileItem = ({ name,group,user,samAcc }) => {
   
  const addUser = async () => {
    try {

      const users = await Axios.get(`${urlHeader}/AddUserToFGroup`, {
        params: {
            user: samAcc
        }
    })

    toast('Added', { type: 'success' })


    } catch (error) {
      toast('Could not grab file Permissions', { type: 'error' })
    }
  }

  return (
    <div className="rowFlex">
      <div>{name}</div>
      <button onClick={() => addUser()}>Add to Group</button>
    </div>
  )
}

const FetchFilePermissions = ({ path }) => {
  const [filePerm, setPerms] = useState([])

  const getFilePermiss = async () => {
    try {

      const filePerms = await Axios.get(`${urlHeader}/FilePermissions`, {
        params: {
            path
        }
    })

      setPerms(filePerms.data)

    } catch (error) {
      toast('Could not grab file Permissions', { type: 'error' })
    }
  }
  return (
    <div>
    <button onClick={() => getFilePermiss(path)}>Get File Permissions</button>
    {filePerm.length !== 0 ? <AddUserToADGroup groups={filePerm}></AddUserToADGroup>: null}
    </div>
  )
}


const AddUserToADGroup = ({ groups }) => {
  const userList = useSelector(state => state.ActiveDirectory.users)
  const [user, setUser] = useState('')
  const [closedDrop, setDrop] = useState(false)
  const [samAcc, setSam] = useState('')


  const setUsers = (name, samAcc) => {
    setUser(name)
    setSam(samAcc)
    if (!closedDrop) setDrop(true)
  }

  const setUserStr = (name) => {
    setUser(name)
    if (closedDrop) setDrop(false)
  }


  useEffect(() => {

  }, [groups, userList])

  return (
    <div>
      <input style={{ width: '150px' }} value={user} onChange={(e) => setUserStr(e.target.value)} type="text" placeholder="User name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
 <p>ok</p>
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
        <div className="colFlex">
        {groups.map(e => {
        return (
          <FileItem name={e} samAcc={samAcc} user={user}></FileItem>
        )

      })}
        </div>
      
    </div>

  )
}
