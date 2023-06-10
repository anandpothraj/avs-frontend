import { Form } from 'react-bootstrap' ;
import React, { useContext }  from 'react';
import { Step } from '../../../Context/Context';
import { Register } from '../../../Context/RegisterContext';

const RegisterForm2 = (props) => {

  const { step} = useContext(Step);
  const { email, setEmail, password, setPassword, secretCode, setSecretCode, phone, setPhone } = useContext(Register);

  return (
    <div className="form-container">
        <h3 className="mb-1">{step}. {props.title} </h3>
        <Form className='mt-3'>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email"  onChange={(e)=>setEmail(e.target.value)} value={email} autoFocus/>
            </Form.Group>  
            <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Create New Password</Form.Label>
                <Form.Control type="password" placeholder="Create New Password" name="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="secretCode">Create Secret Code</Form.Label>
                <Form.Control type="number" placeholder="Create Secret Code" name="secretCode" onChange={(e)=>setSecretCode(e.target.value)} value={secretCode}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="phone">Phone Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Phone Number" name="phone" onChange={(e)=>setPhone(e.target.value)} value={phone}/>
            </Form.Group>
        </Form>
    </div>
  );
};

export default RegisterForm2;