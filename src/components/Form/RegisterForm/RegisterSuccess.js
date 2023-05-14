import { useNavigate } from 'react-router-dom';
import { Step } from '../../../Context/Context';
import { Image, ProgressBar } from 'react-bootstrap';
import SuccessImg from '../../../assets/img/Success.png';
import { Register } from '../../../Context/RegisterContext';
import React, { useState, useContext, useEffect } from 'react';

const RegisterSuccess = (props) => {
  
  const navigate = useNavigate();
  const {setStep} = useContext(Step);
  const [progress , setProgress] = useState(0);
  const {setAccountType, setName, setAadhaar, setEmail, setPassword, setSecretCode, setPhone, setAge, setDob, setGender} = useContext(Register);

  setTimeout(()=>{
    setProgress(100);
  },1000);


  useEffect(() => {
    setTimeout(() => {
      setAccountType("");
      setName("");
      setAadhaar("");
      setEmail("");
      setPassword("");
      setSecretCode("");
      setPhone("");
      setAge("");
      setDob(""); 
      setGender("");
      setStep(1);
      navigate("/login");
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
  )

};

export default RegisterSuccess;