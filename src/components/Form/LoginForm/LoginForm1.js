import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Form, Row } from 'react-bootstrap';
import { Login } from '../../../Context/LoginContext';

const LoginForm1 = () => {

  const { aadhaar, setAadhaar, password, setPassword, accountType, setAccountType } = useContext(Login);

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
                <Form.Label htmlFor="password">Enter Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Your Password" value={password} name="password" autoComplete='off' onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <span className="small">
                <Link to="/">Forget password</Link>
            </span>
        </Row>
      </Form>
    </>
  );
};

export default LoginForm1;