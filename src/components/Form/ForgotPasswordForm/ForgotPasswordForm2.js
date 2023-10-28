import React , { useContext } from 'react';
import { Form, Row } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { maskEmail } from '../../../utils/maskEmail';
import { ForgotPassword } from '../../../Context/ForgotPasswordContext';

const ForgotPasswordForm2 = () => {

    const { otp, setOtp, email, password, setPassword } = useContext(ForgotPassword);
    
    return (
        <>
            <Form>
                <Row>
                    <Form.Group className="mb-2">
                        <small className='d-block border p-2 my-2 rounded border-warning text-warning'><BsInfoCircle className='mx-2'/>Please check your email starts with {maskEmail(email)}</small>
                        <Form.Label htmlFor="password" className='mt-2'>Create New Password</Form.Label>
                        <Form.Control type="password" placeholder="Create New Password" value={password} name="password" autoComplete='off' onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label htmlFor="otp" >Enter OTP</Form.Label>
                        <Form.Control type="number" placeholder="Enter Your 6 digits OTP" value={otp} name="otp" onChange={(e)=>setOtp(e.target.value)} autoFocus/>
                    </Form.Group>
                </Row>
            </Form>
        </>
    );
};

export default ForgotPasswordForm2;