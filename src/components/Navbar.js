import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import {urlHeader} from '../config/config'
import {  Link,withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

const Navbar = () => {
    const history = useHistory()

    return (
        <div class="all" style={{width:'80%',margin:'auto'}}>
<div onClick={() => history.push('/Tree')} class="lefter">
<div class="text"><Link to="/Tree">Tree</Link></div>
</div>
<div class="left" onClick={() => history.push('/Active')}>
  <div class="text"><Link to="/Active">Active Directory</Link></div>
</div>
<div class="center" onClick={() => history.push('/Home')}>
  <div class="explainer"><span>Home</span></div>
</div>
<div class="right" onClick={() => history.push('/Sccm')}>
  <div class="text"><Link> SCCM</Link></div>
</div>
<div class="righter" onClick={() => history.push('/Adobe')}>
  <div class="text"><Link to="/Adobe"> Adobe</Link></div>
</div>
</div>
    )
  }

export default withRouter(Navbar)