import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import { PrinterRemoval } from '../components/ActiveDirectory/Printer';
import { DropdownUsers,RDPSccm } from '../components/ActiveDirectory/ADUsers';


export const ActiveDirectory = () => {
     const [links,setLinks] = useState('')
    return (
        <div>
             <div className="rowFlex" style={{justifyContent:'space-around',backgroundColor:'yellow'}}>
                 <p  onClick={() => setLinks('Printing')}>Printing</p>
                 <p onClick={() => setLinks('Active Directory')}>Active Directory</p>
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