import { useNavigate } from 'react-router-dom';
import { Step } from '../../../Context/Context';
import { Image, ProgressBar } from 'react-bootstrap';
import SuccessImg from '../../../assets/img/Success.png';
import { Login } from '../../../Context/LoginContext';
import React, { useState, useContext, useEffect } from 'react';

const LoginSuccess = (props) => {

  const navigate = useNavigate();
  const {setStep} = useContext(Step);
  const [progress , setProgress] = useState(0);
  const data = JSON.parse(localStorage.getItem('user'));
  const accountType = data.data.accountType.toLowerCase();
  const {setAadhaar,setPassword,setSecretCode} = useContext(Login);

  setTimeout(()=>{
    setProgress(100);
  },1000);

  useEffect(() => {
    setTimeout(() => {
    setStep(1);
    setAadhaar("");
    setPassword("");
    setSecretCode("");
    navigate(`/${accountType}`);
    } , 4000);
  });
  
  return (
      <>
        <div className="row justify-content-center">
          <div className="col-3">
            <Image className="fit-image SuccessImg ml-0" src={SuccessImg} fluid />
          </div>
        </div> 
        <br/>
        <div className="row justify-content-center">
          <div className="col-7 text-center">
            <h6>You Have Successfully {props.success}...</h6>
          </div>
          <ProgressBar striped animated now={progress} variant="success"/>
          <small>
            <b>{props.loading}....</b>
          </small>
        </div>
    </>
  );
};

export default LoginSuccess;