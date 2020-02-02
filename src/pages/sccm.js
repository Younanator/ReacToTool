import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import { ADUser } from '../components/ActiveDirectory/ADUsers';

export const Sccm = () => {
    
    return (
        <div>
           <ADUser></ADUser>
        </div>
    )
}