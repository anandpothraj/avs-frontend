import { Link } from 'react-router-dom';
import React , { useContext } from 'react';
import { Form, Row } from 'react-bootstrap';
import { Login } from '../../../Context/LoginContext';

const LoginForm2 = () => {

    const { secretCode, setSecretCode } = useContext(Login);

    return (
    <>
        <Form>
            <Row className='mb-3'>
                <Form.Group className='mb-1' controlId="formBasicOTP">
                    <Form.Label>Enter Secret Code</Form.Label>
                    <Form.Control type="password" placeholder="Enter Secret Code" onChange={(e)=>setSecretCode(e.target.value)} value={secretCode} />
                </Form.Group>
                <span className="small">
                    <Link to="/">Forget Secretcode</Link>
                </span>
            </Row>
        </Form>  
    </>
    );
};

export default LoginForm2;