import React, { useState, useEffect } from 'react';
import { ADUser } from '../components/ActiveDirectory/ADUsers';
import Axios from 'axios'
import { toast } from 'react-toastify';
import {urlHeader} from '../config/config'
import { ToggleMenu } from '../components/ToggleMenu';

export const Home = () => {
    const links = [
        {link:"https://serviceit.winc.com.au/helpdesk/tickets",name:'ServiceIT'},
        {link:"https://adminconsole.adobe.com/enterprise",name:'Adobe Admin'},
,{link:'https://www.mailcontrol.com/login/login_form.mhtml?sid=6c3294cbd80b1b1e79809b69ffe27bb2&cobrand=&error=NOTRECOGNISED&redirect_to=%2Fportal%2Findex.mhtml&username=',name:'ForcePoint'}
    ,{link:'https://staplesanz.my.salesforce.com/home/home.jsp',name:'SalesForce'}
    ,{link:'https://status.salesforce.com/generalmessages/',name:'SalesForce Trust Status'},
    
    {link:'http://pulselogin.ce.corp/irj/portal',name:'Pulse',app:'iexplore'},
    
]

const adminLinks = [
    {link:'https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code+id_token&scope=openid+profile&state=OpenIdConnect.AuthenticationProperties%3d9CcqQCg5scmRRzdnkA8JBjCAnpTgZVP7LFRHFoYixh1_IMlU9iS8zPo-3GIvay6rBt23zb6RkpEH0hZtbp8M-aVuU0Jidxk9rHhdKH3DIMNRmdseJLieA2Ze9tvUn69TUgmVY2nvNbp_zsOP3PZjeg&nonce=637012564812432545.NjA2OWUwZDAtZDc3NS00NGNjLWE4NjYtZTIxOTliM2Q0ODQ2Mzc4MDBlNTMtZjM1YS00YWI1LThhNTktMTMzMDUzMjJjMDJi&redirect_uri=https%3a%2f%2fadmin.microsoft.com%2flanding&ui_locales=en-US&mkt=en-US&client-request-id=728eb6e4-079d-4629-af31-8fa77b003a28&sso_reload=true',
    name:'Exchange',app:'chrome'},
    {link:'https://10.20.200.10/ccmadmin/showHome.do',name:'Call Manager',app:'chrome'},
    {link:'https://syd1inf65/webadmin/sessionExpired.action',name:'Vasco',app:'chrome'},
    {link:'https://nagios.ce.corp/nagios/',name:'Nagios',app:'chrome'},
    {link:'https://10.20.22.142/admin/',name:'View Administrator',app:'iexplore'}
]


const openLink = async (app,link,name) => {

    await Axios.get(`${urlHeader}/Link`,{
        params:{
            app,
            link
        }
    })

    toast(`Opened ${name}`,{type:'success'})
    
}
    return (
        <div className="rowFlex">
            <ToggleMenu></ToggleMenu>
            <div className="wincLinks">
            {links.map(e => {
                return(
                 <td 
                onClick={()=> e.app !== undefined ? openLink(e.app,e.link,e.name) : window.open(e.link, e.name,3000)}>
               {e.name}
               </td>
                )
            })}
            <p style={{backgroundColor:'yellow'}}>Admin Links</p>
            {adminLinks.map(e => {
                return(
                 <a
                onClick={()=> e.app !== undefined ? openLink(e.app,e.link,e.name) : window.open(e.link, e.name,3000)}>
               {e.name}
               </a>
                )
            })}
            </div>
           
           
        </div>
    )
}