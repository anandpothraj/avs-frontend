import React , { useContext } from 'react';
import { Form, Row } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { maskEmail } from '../../../utils/maskEmail';
import { Login } from '../../../Context/LoginContext';

const LoginForm2 = () => {

    const { otp, setOtp, email } = useContext(Login);
    
    return (
        <>
            <Form>
                <Row>
                    <Form.Group className="mb-3">
                        <small className='d-block border p-2 my-2 rounded border-warning text-warning'><BsInfoCircle className='mx-2'/>Please check your email starts with {maskEmail(email)}</small>
                        <Form.Label htmlFor="otp" >Enter OTP</Form.Label>
                        <Form.Control type="number" placeholder="Enter Your 6 digits OTP" value={otp} name="otp" onChange={(e)=>setOtp(e.target.value)} autoFocus/>
                    </Form.Group>
                </Row>
            </Form>
        </>
    );
};

export default LoginForm2;