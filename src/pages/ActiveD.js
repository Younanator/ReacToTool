import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid'
import Axios from 'axios'
import { PrinterRemoval } from '../components/ActiveDirectory/Printer';
import { DropdownUsers,RDPSccm } from '../components/ActiveDirectory/ADUsers';
import '../scss/ToggleMenu.scss'
import '../scss/NavbarLinks.scss'
import { FilePermissions } from '../components/ActiveDirectory/FilePermission/FilePermissions';
import { toast } from 'react-toastify';
import {urlHeader} from '../config/config'

export const ActiveDirectory = () => {
     const [links,setLinks] = useState('')
     const dispatch = useDispatch();
     const userList = useSelector(state => state.ActiveDirectory.users)

     const getUsers = () => dispatch => {

        toast('Grabbing AD Users', { type: 'info' })
        Axios.get(`${urlHeader}/AllUsers`).then(resp => {
            dispatch({ type: 'GET_USERS', payload: resp.data })
            toast('Got All AD Users', { type: 'success' })

        }, err => {
            toast('Failed to grab users', { type: 'error' })

        })

    }

    useEffect(() => {
        if (userList.length === 0) {
            dispatch(getUsers())
        }

    }, [userList, dispatch])

     const ToggleLinks = () => {
        return(
          <div className="nav-links">
            <ul>
            <li><a onClick={() => setLinks('Printing')}>Printing</a></li>
        <li><a onClick={() => setLinks('Active Directory')}>AD</a></li>
        <li><a onClick={() => setLinks('File')}>File</a></li>
</ul>
          </div>
    
        )
      }

    return (
        <div>
            <div style={{display:'flex',width:'50%',margin:'auto',height:'auto',justifyContent:'center'}}>
            <ToggleLinks></ToggleLinks> 
            </div>
             
            <div className="colFlex">
               {links === 'Printing' ? <div style={{display:'flex',justifyContent:'center',width:'30%',margin:'auto'}}>
                <PrinterRemoval></PrinterRemoval>
                </div> 
                :
                null
                }
                {links === 'Active Directory' 
                ? 
                <div className="colFlex" style={{display:'flex',width:'auto',maxHeight:'300px',minWidth:'40%',maxWidth:'80%',margin:'auto',backgroundColor:'#b4b4f1'}}>
            <DropdownUsers></DropdownUsers>
           
            </div>
                :
                null
                }
                {links === 'File' 
                ? 
                <div className="colFlex" style={{display:'flex',width:'auto',maxHeight:'300px',minWidth:'40%',maxWidth:'80%',margin:'auto',backgroundColor:'#b4b4f1'}}>
            <FilePermissions></FilePermissions>
           
            </div>
                :
                null
                }
          
                
            
            </div>
           
        </div>
    )
}



