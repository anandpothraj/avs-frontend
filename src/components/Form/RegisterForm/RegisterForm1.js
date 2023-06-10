import { Form } from 'react-bootstrap';
import React,{ useContext } from 'react';
import { Step } from '../../../Context/Context';
import { Register } from '../../../Context/RegisterContext';

const RegisterForm1 = (props) => {

  const {accountType, setAccountType, name , setName, aadhaar, setAadhaar} = useContext(Register);
  const {step} = useContext(Step);

  return (
    <div className="form-container">
        <h3 className="mb-2">{step}. {props.title}</h3>
        <Form.Group className="mb-3">
            <Form.Label  htmlFor="accountType" className="form-label mt-4">You Are ?</Form.Label>
            <select className="form-select" name="accountType" onChange={(e)=>setAccountType(e.target.value)} value={accountType} required>
                <option>Patient</option>
                <option>Doctor</option>
                <option>Inspector</option>
            </select>
        </Form.Group>
        <Form.Group className="mb-3" autoComplete="none" >
            <Form.Label htmlFor="name" >Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" onChange={(e)=>setName(e.target.value)} value={name}  id="validationCustom01" required autoFocus/>
        </Form.Group>
        <Form.Group className="mb-3">
                <Form.Label htmlFor="aadhaar" >Aadhaar Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Your Aadhaar Number" name="aadhaar" onChange={(e)=>setAadhaar(e.target.value)} value={aadhaar} />
        </Form.Group>
    </div>
  );
};

export default RegisterForm1;