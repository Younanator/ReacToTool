import React, { useState, useEffect } from 'react';
import { ADUser } from '../components/ActiveDirectory/ADUsers';

export const Home = () => {
    const links = [
        {link:"https://serviceit.winc.com.au/helpdesk/tickets",name:'ServiceIT'},
        {link:"https://adminconsole.adobe.com/enterprise",name:'Adobe Admin'},
,{link:'https://www.mailcontrol.com/login/login_form.mhtml?sid=6c3294cbd80b1b1e79809b69ffe27bb2&cobrand=&error=NOTRECOGNISED&redirect_to=%2Fportal%2Findex.mhtml&username=',name:'ForcePoint'}
    ,{link:'https://staplesanz.my.salesforce.com/home/home.jsp',name:'SalesForce'}
    ,{link:'https://status.salesforce.com/generalmessages/',name:'SalesForce Trust Status'}
] 
    return (
        <div className="wincLinks">
            {links.map(e => {
                return(
                 <td 
                onClick={()=> window.open(e.link, e.name,3000)}>
               {e.name}
               </td>
               
                )
                 
            })}
           
           
        </div>
    )
}