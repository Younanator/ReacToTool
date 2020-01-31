import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import { AdobeDisabled } from '../components/AdobeDisabled';
import { PrinterRemoval } from '../components/Printer';
import { UnlockUser } from '../components/UnlockUser';

export const ActiveDirectory = () => {
    
    return (
        <div>
            
            <PrinterRemoval></PrinterRemoval>
            <UnlockUser></UnlockUser>
        </div>
    )
}