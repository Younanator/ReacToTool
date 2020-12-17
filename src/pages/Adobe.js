import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import { AdobeDisabled } from '../components/Adobe/AdobeDisabled';
import Axios from 'axios'
export const AdobePage = () => {
    const grabUser = async() => {
            const user = Axios.get('https://usermanagement.adobe.io/v2/usermanagement/organizations/{orgId}/users/{userString}')
            
    }
    return (
        <div>
            
            <p style={{display:'flex',margin:'auto',width:'70%',fontWeight:'bold'}}> You may add your own API Calls or features here</p>
           
        </div>
    )
}

