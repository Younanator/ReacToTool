import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import {urlHeader} from '../config/config'
import {  Link,withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

export const ToggleMenu = () => {
    return(
      <div style={{width:'40px'}}>
<nav class="btn-pluss-wrapper">
 <div href="#" class="btn-pluss">
  <ul>
    <li><a href="#about">About me</a></li>
    <li><a href="#blog">Blog</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
 </div>
</nav>
      </div>

    )
  }
