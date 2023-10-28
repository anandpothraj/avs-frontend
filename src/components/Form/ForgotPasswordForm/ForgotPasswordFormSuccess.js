import { useNavigate } from 'react-router-dom';
import { Step } from '../../../Context/Context';
import { Image, ProgressBar } from 'react-bootstrap';
import SuccessImg from '../../../assets/img/Success.png';
import React, { useState, useContext, useEffect } from 'react';

const ForgotPasswordFormSuccess = (props) => {

  const navigate = useNavigate();
  const { setStep } = useContext(Step);
  const [ progress , setProgress ] = useState(0);

  setTimeout(()=>{
    setProgress(100);
  },1000);

  useEffect(() => {
    setTimeout(() => {
      setStep(1);
      navigate("/login");
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
            <h6>You have successfully {props.success}...</h6>
          </div>
          <ProgressBar striped animated now={progress} variant="success"/>
          <small>
            <b>{props.loading}....</b>
          </small>
        </div>
    </>
  );
};

export default ForgotPasswordFormSuccess;