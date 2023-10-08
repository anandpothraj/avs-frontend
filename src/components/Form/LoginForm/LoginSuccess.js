import { useNavigate } from 'react-router-dom';
import { isJson } from '../../../utils/isJson';
import { Step } from '../../../Context/Context';
import { Image, ProgressBar } from 'react-bootstrap';
import { Login } from '../../../Context/LoginContext';
import SuccessImg from '../../../assets/img/Success.png';
import React, { useState, useContext, useEffect } from 'react';

const LoginSuccess = (props) => {

  const navigate = useNavigate();
  const { setStep } = useContext(Step);
  const [ progress , setProgress ] = useState(0);
  const { setAadhaar, setPassword, setOtp } = useContext(Login);

  setTimeout(()=>{
    setProgress(100);
  },1000);

  useEffect(() => {
    setTimeout(() => {
    // fetching user from localstorage
    let user = localStorage.getItem("user");
    // if user exist then check the json is valid or not and if user is not exist then redirect to "/"
    if (user && isJson(user)) {
      user = JSON.parse(user);
      let accountType = user.accountType.toLowerCase();
      setStep(1);
      setOtp("");
      setAadhaar("");
      setPassword("");
      navigate(`/${accountType}`);
    } else {
      setStep(4);
    }
    } , 4000);
    // eslint-disable-next-line
  },[]);
  
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