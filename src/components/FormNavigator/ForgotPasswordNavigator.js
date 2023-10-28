import axios from 'axios';
import { Link } from 'react-router-dom';
import Timer from '../Form/LoginForm/Timer';
import { notify } from '../../utils/notify';
import { Step } from '../../Context/Context';
import server from '../../config/server.json';
import { AiOutlineReload } from 'react-icons/ai';
import { Button, Spinner } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { ForgotPassword } from '../../Context/ForgotPasswordContext';

const ForgotPasswordNavigator = (props) => {

  const production = server.url.production;
  const { step, setStep } = useContext(Step);
  const [ loading, setLoading] = useState(false);
  const FORGOT_PASSWORD_STEP1 = server.api.users.FORGOT_PASSWORD_STEP1;
  const FORGOT_PASSWORD_STEP2 = server.api.users.FORGOT_PASSWORD_STEP2;
  const { accountType, setAccountType, aadhaar, setAadhaar, email, setEmail, otp, setOtp, password, setPassword, seconds, setSeconds, isActive, setIsActive } = useContext(ForgotPassword);

  const reset = () => {
    if(step === 1){
      setAadhaar("");
      setEmail("");
      setAccountType("Patient");
    }
    else if(step === 2){
      setOtp("");
      setPassword("");
    }
    else{
      notify("error","Something went wrong");
    }
  };

  const next = () => {
    if(step === 1){
      if(accountType && aadhaar && email){
        if(aadhaar.length === 12){
          checkUserCredentials(false);
        }
        else{
          notify("error","Aadhaar number length should be 12 only characters!")
        }
      }
      else{
        notify("error","Please fill all the fields!");
      }
    }
    else if(step === 2){
      if(otp && password){
        if(otp.length === 6){
          if(password.length >=6){
            verifyOtpAndCreateNewPassword();
          }
          else{
            notify("error","Your password length should be always greater or equal to 6 characters!")
          }
        }
        else{
          notify("error","Invalid Otp! Your OTP should always be 6 digits!")
        }
      }
      else{
        notify("error","Please fill all the fields!");
      }
    }
    else{
      notify("error","Something went wrong");
    }
  };

  const checkUserCredentials = (resend) => {
    setLoading(true);
    const title = "Your Password Reset OTP for Anand Vaccination System";
    const data = { accountType, aadhaar, title, email };
    axios
    .post(`${production}${FORGOT_PASSWORD_STEP1}`, data)
    .then((response) => {
      if (response.status === 200) {
        setEmail(response.data.email); // Assuming `email` is part of the response data
        if (resend) {
          notify("success", "Your OTP resend was successfully!");
          setIsActive(true);
          setSeconds(60);
        } else {
          notify("success", response.data.message);
          setStep(step + 1);
        }
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        notify("error", error.response.data.message);
      } else {
        notify("error", "An error occurred during login.");
      }
    });
  };

  const verifyOtpAndCreateNewPassword = () => {
    setLoading(true);
    const data = { accountType, aadhaar, email, password, otp };
    axios
    .post(`${production}${FORGOT_PASSWORD_STEP2}`,data)
    .then(res => {
      if (res.status === 200) {
        setStep(step + 1);
      }
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      notify("error",err.response.data.message);
    })
  }

  return (
    <>
      { step === 2 && <span className="small">
        <Button size='sm' variant='outline-info' disabled={isActive}  onClick={()=>checkUserCredentials(true)}>
            <AiOutlineReload className='mx-2'/>Request again 
            {isActive && <Timer 
                seconds={seconds}
                isActive={isActive}
                setSeconds={setSeconds}
                setIsActive={setIsActive}
            />}
        </Button>
      </span>}
      <div className='d-flex justify-content-between my-3'>
        {step < 3 ? <Button className="m-1" size='sm' variant="danger" onClick={reset}>Reset</Button> : null}
        {step < 3 ? <Button className="m-1" size='sm' variant="success" onClick={next}>{step === 1 ? "Send OTP" : "Submit" }
          {
              loading ? 
              <Spinner animation="border" variant="white" size='sm' className='mx-2'>
                  <span className="visually-hidden">Loading...</span>
              </Spinner> : null
          }</Button> : null} 
      </div>
      {step === 1 && props.FormType === "Forgot Password" ? <p className="mt-2">Retry <Link to="/login">Login?.</Link></p> : null}
    </>
  );
};

export default ForgotPasswordNavigator;