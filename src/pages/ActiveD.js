import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import { PrinterRemoval } from '../components/ActiveDirectory/Printer';
import { DropdownUsers,RDPSccm } from '../components/ActiveDirectory/ADUsers';


export const ActiveDirectory = () => {
    
    return (
        <div>
            <div className="colFlex">
                <div style={{display:'flex',justifyContent:'center',width:'30%',margin:'auto'}}>
                <PrinterRemoval></PrinterRemoval>
                </div>
            <div className="colFlex" style={{width:'auto',minWidth:'40%',maxWidth:'80%',margin:'auto',backgroundColor:'#b4b4f1'}}>
            <DropdownUsers></DropdownUsers>
            <RDPSccm></RDPSccm>
            </div>
            </div>
           
        </div>
    )
}