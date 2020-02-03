import React, { useState, useEffect } from 'react';
import { ADUser } from '../components/ActiveDirectory/ADUsers';

export const Home = () => {
    
    return (
        <div className="wincLinks">
           <td 
           onClick={()=> window.open("https://serviceit.winc.com.au/helpdesk/tickets", "Helpdesk")}>
          ServiceIT</td>
          <td 
           onClick={()=> window.open("https://adminconsole.adobe.com/enterprise", "Adobe Admin")}>
         Adobe Admin</td>
        </div>
    )
}