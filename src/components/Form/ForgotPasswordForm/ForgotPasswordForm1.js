import React, { useContext } from 'react';
import { Form, Row } from 'react-bootstrap';
import { ForgotPassword } from '../../../Context/ForgotPasswordContext';

const ForgetPasswordForm1 = () => {

  const { accountType, setAccountType, aadhaar, setAadhaar, email, setEmail } = useContext(ForgotPassword);

  return (
    <>
      <Form>
        <Row className="mb-3">
        <Form.Group className="mb-3">
            <Form.Label  htmlFor="accountType" className="mt-4 w-50">Login As ?</Form.Label>
            <select className="form-select form-select-sm w-50" name="accountType" onChange={(e)=>setAccountType(e.target.value)} value={accountType} required>
                <option>Patient</option>
                <option>Doctor</option>
                <option>Inspector</option>
            </select>
        </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="aadhaar" > Enter Aadhaar Number</Form.Label>
              <Form.Control type="number" placeholder="Enter Your Aadhaar Number" value={aadhaar} name="aadhaar" onChange={(e)=>setAadhaar(e.target.value)} autoFocus/>
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label htmlFor="email">Enter Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Your Email id" value={email} name="email" autoComplete='off' onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
        </Row>
      </Form>
    </>
  );
};

export default ForgetPasswordForm1;