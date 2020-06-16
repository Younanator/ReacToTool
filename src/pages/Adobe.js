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
            
           <AdobeDisabled></AdobeDisabled>
        </div>
    )
}

