import axios from 'axios';
import { Link } from 'react-router-dom';
import Timer from '../Form/LoginForm/Timer';
import { notify } from '../../utils/notify';
import { Step } from '../../Context/Context';
import server from '../../config/server.json';
import { AiOutlineReload } from 'react-icons/ai';
import { Button, Spinner } from 'react-bootstrap';
import { Login } from '../../Context/LoginContext';
import React, { useState, useContext } from 'react';

const LoginFormNavigator = (props) => {

  const production = server.url.production;
  const { step, setStep } = useContext(Step);
  const LOGIN_STEP1 = server.api.users.LOGIN_STEP1;
  const LOGIN_STEP2 = server.api.users.LOGIN_STEP2;
  const [ loading, setLoading ] = useState(false);
  const { aadhaar, setAadhaar, password, setPassword, otp, setOtp, accountType, setAccountType, setEmail, isActive, seconds, setSeconds, setIsActive } = useContext(Login);

  const reset = () => {
    if(step === 1){
      setAadhaar("");
      setPassword("");
      setAccountType("Patient");
    }
    else if(step === 2){
      setOtp("");
    }
    else{
      notify("error","Something went wrong");
    }
  };

  const next = () => {
    if(step === 1){
      if(aadhaar && password){
        if(aadhaar.length === 12){
          if(password.length >=6){
            checkLoginCredentials(false);
          }
          else{
            notify("error","Your password length should be always greater or equal to 6 characters!")
          }
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
      if(otp){
        if(otp.length === 6){
          checkOtp();
        }
        else{
          notify("error","Invalid Otp! Your OTP should always be 6 digits!")
        }
      }
      else{
        notify("error","Please enter your OTP!");
      }
    }
    else{
      notify("error","Something went wrong");
    }
  };

  const checkLoginCredentials = (resend) => {
    setLoading(true);
    const title = "Your Login OTP for Anand Vaccination System";
    const data = { accountType, aadhaar, password, title };
    axios
    .post(`${production}${LOGIN_STEP1}`, data)
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
  
  const checkOtp = () => {
    setLoading(true);
    const data = { accountType, aadhaar, otp };
    axios
    .post(`${production}${LOGIN_STEP2}`,data)
    .then(res => {
      if (res.status === 200) {
        const { data } = res;
        const { aadhaar, accountType, age, dob, email, gender, name, phone, _id, token } = data;
        const user = { _id, aadhaar, accountType, name, age, dob, gender, phone, email };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setStep(step + 1);
      }
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      notify("error",err.response.data.message);
    })
  };

  return (
    <>
      { step === 2 && <span className="small">
        <Button size='sm' variant='outline-info' disabled={isActive} onClick={()=>checkLoginCredentials(true)}>
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
        {step < 3 ? <Button className="m-1" size='sm' variant="success" onClick={next}>Continue
          {
              loading ? 
              <Spinner animation="border" variant="white" size='sm' className='mx-2'>
                  <span className="visually-hidden">Loading...</span>
              </Spinner> : null
          }</Button> : null} 
      </div>
      {step === 1 && props.FormType === "Login" ? <p className="mt-2">New to website <Link to="/register">Register.</Link></p> : null}
    </>
  );
};

export default LoginFormNavigator;