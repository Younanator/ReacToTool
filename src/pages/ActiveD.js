import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import { PrinterRemoval } from '../components/ActiveDirectory/Printer';
import { DropdownUsers,RDPSccm } from '../components/ActiveDirectory/ADUsers';


export const ActiveDirectory = () => {
    
    return (
        <div>
            <div className="colFlex">
            <PrinterRemoval></PrinterRemoval>
           <DropdownUsers></DropdownUsers>
           
            </div>
           
        </div>
    )
}