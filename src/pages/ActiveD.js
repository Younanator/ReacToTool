import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import { PrinterRemoval } from '../components/ActiveDirectory/Printer';
import { DropdownUsers,RDPSccm } from '../components/ActiveDirectory/ADUsers';


export const ActiveDirectory = () => {
     const [links,setLinks] = useState('')

     const ToggleLinks = () => {
        return(
          <div style={{width:'40px'}}>
    <nav class="btn-pluss-wrapper">
     <div href="#" class="btn-pluss">
      <ul>
        <li><a onClick={() => setLinks('Printing')}>Printing</a></li>
        <li><a onClick={() => setLinks('Active Directory')}>AD</a></li>
      </ul>
     </div>
    </nav>
          </div>
    
        )
      }

    return (
        <div>
            <div style={{display:'flex',width:'50%',margin:'auto',justifyContent:'center'}}>
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
                <div className="colFlex" style={{width:'auto',minWidth:'40%',maxWidth:'80%',margin:'auto',backgroundColor:'#b4b4f1'}}>
            <DropdownUsers></DropdownUsers>
            <RDPSccm></RDPSccm>
            </div>
                :
                null
                }
                
            
            </div>
           
        </div>
    )
}



