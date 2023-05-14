import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Step } from '../../Context/Context';
import { Col, Row, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Register } from '../../Context/RegisterContext';

const RegiterFormNavigator = (props) => {

    const { step, setStep } = useContext(Step);
    const { accountType, setAccountType, name, setName, aadhaar, setAadhaar, email, setEmail, password, 
    setPassword, secretCode, setSecretCode, phone, setPhone, age, setAge, dob, setDob, gender, setGender } = useContext(Register);

    const reset = () => {
        if(step === 1){
            setName("");
            setAadhaar("");
            setAccountType("");
        }
        else if(step === 2){
            setEmail("");
            setPhone("");
            setPassword("");
            setSecretCode("");
        }
        else if(step === 3){
            setAge("");
            setDob("");
            setGender("");
        }
        else{
            toast.error("Something went wrong");
        }
    };

    const next = () => {
        if(step === 1){
            if(accountType && name && aadhaar){
                if(aadhaar.length === 12){
                    setStep(step+1);
                }
                else{
                    toast.error("Aadhaar card should only have 12 digits!");
                }
            }
            else{
                toast.error("Please fill all the fields!");
            }
        }
        else if(step === 2){
            if(email && password && secretCode && phone){
                if(password.length < 6){
                    toast.error("Password length should be always greater than 6 characters.");
                }
                else{
                    if(secretCode.length === 4){
                        if(phone.length === 10){
                            setStep(step+1);
                        }
                        else{
                            toast.error("Phone number should be always only of 10 digits.");
                        }
                    }
                    else{
                        toast.error("Secret Code should always be equal to 4 digits only");
                    }
                }
            }
            else{
                toast.error("Please fill all the fields.");
            }
        }
        else if(step === 3){
            if(dob && gender && age ){
                setStep(step+1);
            }
            else{
                toast.error("Please fill all the fields!");
            }
        }
        else if (step === 4){
            setStep(step+1);
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


    return (
        <>
            <ToastContainer/>
            <Row>
                {step > 1 && step < 5 ?
                <Col>
                    <Button className="m-1" variant="warning" onClick={previous}>Previous</Button>
                </Col> : null
                }
                {step < 4 ? 
                <Col>
                    <Button className="m-1" variant="danger" onClick={reset}>Reset</Button>
                </Col> : null
                }
                {step < 5 ?
                    <Col>
                        <Button className="m-1" variant="success" onClick={next}>Continue</Button>
                    </Col> : null
                }
            </Row>    
            {step === 1 && props.FormType === "Register" ? <p className="mt-2">Already a user <Link to="/login">Login.</Link></p> : null}
        </>
    );
};

export default RegiterFormNavigator;