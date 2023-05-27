import { Link } from 'react-router-dom';
import React , { useContext } from 'react';
import { Form, Row } from 'react-bootstrap';
import { Login } from '../../../Context/LoginContext';

const LoginForm2 = () => {

    const { secretCode, setSecretCode } = useContext(Login);

    return (
        <>
            <Form>
                <Row className="mb-3">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="secretCode" >Enter Secret Code</Form.Label>
                        <Form.Control type="number" placeholder="Enter Your Secret Code" value={secretCode} name="secretCode" onChange={(e)=>setSecretCode(e.target.value)}/>
                    </Form.Group>
                    <span className="small">
                        <Link to="/">Forget Secret Code</Link>
                    </span>
                </Row>
            </Form>
        </>
    );
};

export default LoginForm2;