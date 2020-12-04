import React, { useState, useEffect } from 'react';
import { ADUser } from '../components/ActiveDirectory/ADUsers';
import Axios from 'axios'
import { toast } from 'react-toastify';
import {urlHeader} from '../config/config'
import { ToggleMenu } from '../components/ToggleMenu';
import {  Link,withRouter } from 'react-router-dom';

{/** You will need to configure this for your own links 
You can add more*/}
export const Home = () => {

    

    const links = [
        {link:"https://adminconsole.adobe.com/enterprise",name:'Adobe Admin'},
    ,{link:'https://staplesanz.my.salesforce.com/home/home.jsp',name:'SalesForce'}
    ,{link:'https://status.salesforce.com/generalmessages/',name:'SalesForce Trust Status'},   
]

const adminLinks = [
    {app:'dsa.msc',name:'Active Directory'},
    {app:'saplogon',name:'Sap Logon'},
    {link:'https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code+id_token&scope=openid+profile&state=OpenIdConnect.AuthenticationProperties%3d9CcqQCg5scmRRzdnkA8JBjCAnpTgZVP7LFRHFoYixh1_IMlU9iS8zPo-3GIvay6rBt23zb6RkpEH0hZtbp8M-aVuU0Jidxk9rHhdKH3DIMNRmdseJLieA2Ze9tvUn69TUgmVY2nvNbp_zsOP3PZjeg&nonce=637012564812432545.NjA2OWUwZDAtZDc3NS00NGNjLWE4NjYtZTIxOTliM2Q0ODQ2Mzc4MDBlNTMtZjM1YS00YWI1LThhNTktMTMzMDUzMjJjMDJi&redirect_uri=https%3a%2f%2fadmin.microsoft.com%2flanding&ui_locales=en-US&mkt=en-US&client-request-id=728eb6e4-079d-4629-af31-8fa77b003a28&sso_reload=true',
    name:'Exchange',app:'chrome'},
    {link:'https://dwdwd/ccmadmin/showHome.do',name:'Call Manager',app:'chrome'}, 
    {link:'https://{syd1inf65}/webadmin/sessionExpired.action',name:'Vasco',app:'chrome'},
{link:'https://nagios/nagios/',name:'Nagios',app:'chrome'}, 
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
            
            <Link to="/Scanner">Scanner</Link>
            
            <div className="wincLinks">
            {links.map(e => {
                return(
                 <td 
                onClick={()=> e.app !== undefined ? openLink(e.app,e.link,e.name) : window.open(e.link, e.name,3000)}>
               {e.name}
               </td>
                )
            })}
            <h3>Admin Links</h3>
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