import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Form, Row } from 'react-bootstrap';
import { Login } from '../../../Context/LoginContext';

const LoginForm1 = () => {

  const { aadhaar, setAadhaar, password, setPassword } = useContext(Login);

  return (
    <>
      <Form>
        <Row className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="aadhaar" > Enter Aadhaar Number</Form.Label>
              <Form.Control type="number" placeholder="Enter Your Aadhaar Number" value={aadhaar} name="aadhaar" onChange={(e)=>setAadhaar(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label htmlFor="password">Enter Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Your Password" value={password} name="password" onChange={(e)=>setPassword(e.target.value)}/>
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