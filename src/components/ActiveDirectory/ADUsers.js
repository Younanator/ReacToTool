
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import uuid from 'react-uuid'
import Axios from 'axios'
import { urlHeader } from '../../config/config'
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export const ADUser = () => {

    return (
        <div>
         Not Implemented
        </div>
    )
}
