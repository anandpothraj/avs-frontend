import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Step } from '../../Context/Context';
import { Login } from '../../Context/LoginContext';
import { Col, Row, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const LoginFormNavigator = (props) => {

  const { step, setStep } = useContext(Step);
  const { aadhaar, setAadhaar, password, setPassword, secretCode, setSecretCode } = useContext(Login);

  const reset = () => {
    if(step === 1){
      setAadhaar("");
      setPassword("");
    }
    else if(step === 2){
      setSecretCode("");
    }
    else{
      toast.error("Something went wrong");
    }
  };

  const next = () => {
    if(step === 1){
      if(aadhaar){
        if(password){
          if(aadhaar.length === 12){
            if(password.length >=6){
              checkLoginCredentials();
            }
            else{
              toast.error("Your password length should be always greater or equal to 6 characters!")
            }
          }
          else{
            toast.error("Aadhaar number length should be 12 only characters!")
          }
        }
        else{
          toast.error("Please enter your password!")
        }
      }
      else{
        toast.error("Please enter your Aadhaar Number!")
      }
    }
    else if(step === 2){
      if(secretCode){
        if(secretCode.length === 4){
          checkSecretCode();
        }
        else{
          toast.error("Your secret code length should always be 4 digits!")
        }
      }
      else{
        toast.error("Please enter your secret code!");
      }
    }
    else{
      toast.error("Something went wrong");
    }
  };

  const previous = () => {
    if(step > 1){
      setStep(step-1);
    }
  };

  const checkLoginCredentials = () => {
    console.log("Aadhaar Card : ", aadhaar);
    console.log("Password : ", password);
    setStep(step+1);
  };

  const checkSecretCode = () => {
    console.log("Secret Code : ", secretCode);
    setStep(step+1);
  };

  return (
    <>
      <ToastContainer/>
      <Row>
          {step === 2 ?
          <Col>
              <Button className="m-1" variant="warning" onClick={previous}>Previous</Button>
          </Col> : null
          }
          <Col>
              <Button className="m-1" variant="danger" onClick={reset}>Reset</Button>
          </Col>
          <Col>
              <Button className="m-1" variant="success" onClick={next}>Continue</Button>
          </Col>
      </Row>    
      {step === 1 && props.FormType === "Login" ? <p className="mt-2">New to website <Link to="/">Register.</Link></p> : null}
    </>
  );
};

export default LoginFormNavigator;