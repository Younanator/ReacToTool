import React, { useState, useEffect } from 'react';
import { ADUser } from '../components/ActiveDirectory/ADUsers';
import Axios from 'axios'
import { toast } from 'react-toastify';
import {urlHeader} from '../config/config'
import { ToggleMenu } from '../components/ToggleMenu';
import {  Link,withRouter } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
const electron = window.require('electron');
const { ipcRenderer} = electron
{/** You will need to configure this for your own links 
You can add more*/}

export const Home = () => {

const links = [
        {link:"https://adminconsole.adobe.com/enterprise",name:'Adobe Admin'},
    ,{link:'https://my.salesforce.com/home/home.jsp',name:'SalesForce'}
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
           
           
           
            <div style={{margin:'auto',display:'flex',flexDirection:'column'}}>
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
            
            <ComputerInfo></ComputerInfo>
            </div>
           
           
           
        </div>
    )
}


const ComputerInfo = () => {

    const [compInfo,setInfo] = useState([])
    const [fetchAPI,setFetch] = useState(true)


    const getInfo =  async () => {
        ipcRenderer.send('compInfo', 'ping')
    }

    ipcRenderer.on('compInfo-reply', (event, arg) => {
        setInfo(arg)
        setFetch(false)
    })

    useEffect(() => {
        getInfo()
        
    }, [])

    return (
        <div>
            
      { !fetchAPI ? 
      <table style={{width:'20%'}}>
      <tr>
        <th style={{fontSize:'0.7rem'}}>Component</th>
        <th style={{fontSize:'0.7rem'}}>Value</th>
        
      </tr>
    {compInfo.map(e => {
        const item = e.split(':')
          return (
            <tr>
            <td style={{fontSize:'0.65rem'}}>{item[0]}</td>
            <td style={{fontSize:'0.65rem'}}>{item[1]}</td>
            
          </tr>
          )
      }) }
  
      </table>
      : <Skeleton height={150} width={450}></Skeleton>}
        </div>
    )
}