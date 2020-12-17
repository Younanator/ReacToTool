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
    {link:'https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0',
    name:'Exchange',app:'chrome'},
    {link:'https://dwdwd/ccmadmin/showHome.do',name:'Call Manager',app:'chrome'}, 
    {link:'https://pages/webadmin/sessionExpired.action',name:'Vasco',app:'chrome'},
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
            
            
            <div style={{margin:'auto',display:'flex',width:'150px',marginTop:'10px',marginLeft:'100px'}}>
            <div className="wincLinks">
            <Link to="/Scanner" style={{outline:'none',color:'white',textDecoration:'none'}} className="normalLinks" >Scanner</Link>
            {links.map(e => {
                return(
                 <a className="normalLinks" style={{color:'white'}}
                onClick={()=> e.app !== undefined ? openLink(e.app,e.link,e.name) : window.open(e.link, e.name,3000)}>
               {e.name}
               </a>
                )
            })}
           
            {adminLinks.map(e => {
                return(
                 <a className="adminLinks"
                onClick={()=> e.app !== undefined ? openLink(e.app,e.link,e.name) : window.open(e.link, e.name,3000)}>
               {e.name}
               </a>
                )
            })}
            </div>
            </div>
           
           
        </div>
    )
}