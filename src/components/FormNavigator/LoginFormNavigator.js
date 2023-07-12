import axios from 'axios';
import { Link } from 'react-router-dom';
import { notify } from '../../utils/notify';
import { Step } from '../../Context/Context';
import server from '../../config/server.json';
import { Button, Spinner } from 'react-bootstrap';
import { Login } from '../../Context/LoginContext';
import React, { useState, useContext } from 'react';

const LoginFormNavigator = (props) => {

  const production = server.url.production;
  const { step, setStep } = useContext(Step);
  const LOGIN_STEP1 = server.api.LOGIN_STEP1;
  const LOGIN_STEP2 = server.api.LOGIN_STEP2;
  const [ loading, setLoading ] = useState(false);
  const { aadhaar, setAadhaar, password, setPassword, secretCode, setSecretCode, accountType, setAccountType } = useContext(Login);

  const reset = () => {
    if(step === 1){
      setAadhaar("");
      setPassword("");
      setAccountType("Patient");
    }
    else if(step === 2){
      setSecretCode("");
    }
    else{
      notify("Something went wrong");
    }
  };

  const next = () => {
    if(step === 1){
      if(aadhaar && password){
        if(aadhaar.length === 12){
          if(password.length >=6){
            checkLoginCredentials();
          }
          else{
            notify("Your password length should be always greater or equal to 6 characters!")
          }
        }
        else{
          notify("Aadhaar number length should be 12 only characters!")
        }
      }
      else{
        notify("Please fill all the fields!");
      }
    }
    else if(step === 2){
      if(secretCode){
        if(secretCode.length === 4){
          checkSecretCode();
        }
        else{
          notify("Your secret code length should always be 4 digits!")
        }
      }
      else{
        notify("Please enter your secret code!");
      }
    }
    else{
      notify("Something went wrong");
    }
  };

  const previous = () => {
    if(step > 1){
      setStep(step-1);
    }
  };

  const checkLoginCredentials = () => {
    setLoading(true);
    const data = { accountType, aadhaar, password };
    axios
    .post(`${production}${LOGIN_STEP1}`,data)
    .then(res => {
      if(res.status === 200){
        setStep(step + 1);
      }
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      notify(err.response.data.message);
    })
  };

  const checkSecretCode = () => {
    setLoading(true);
    const data = { accountType, aadhaar, secretCode };
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
      notify(err.response.data.message);
    })
  };

  return (
    <>
      <div className='d-flex justify-content-between'>
        {step < 3 ? <Button className="m-1" size='sm' variant="danger" onClick={reset}>Reset</Button> : null} 
        {step === 2 ? <Button className="m-1" size='sm' variant="warning" onClick={previous}>Previous</Button> : null}
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