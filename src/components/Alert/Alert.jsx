import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../../redux/err/alertSlice';
import { VscError } from "react-icons/vsc";
import { PiWarningLight } from "react-icons/pi";
import { BiCheckCircle } from "react-icons/bi";

import './Alert.css'

const Alert = () => {
    const dispatch = useDispatch();
    const {show, message, type} = useSelector(state => state.alert)

    if(!show) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span className='alert-message'>
                {type === "error" && <VscError />}
                {type === "success" && <BiCheckCircle />}
                {type === "warning" && <PiWarningLight />}
                {message}
      </span>
      <button className='alert-close' onClick={() => dispatch(hideAlert())}> &times; </button>
    </div>
  )
}


export default Alert
