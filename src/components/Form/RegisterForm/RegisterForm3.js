import { Form } from 'react-bootstrap' ;
import React, { useContext } from 'react';
import { Step } from '../../../Context/Context';
import { returnAge } from '../../../utils/returnAge';
import { Register } from '../../../Context/RegisterContext';

const RegisterForm3 = (props) => {
    
    const { step } = useContext(Step);
    const { age, setAge, dob, setDob, gender, setGender} = useContext(Register);
  
    const getAge = (dateBirth) => {
        let fetchedAge = returnAge(dateBirth);
        setAge(fetchedAge);
    }

    return (
        <div className="form-container">
            <h3 className="mb-1">{step}. {props.title} </h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="dob" >Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Enter Date of Birth" name="dob" onChange={(e)=>{setDob(e.target.value);getAge(e.target.value)}} value={dob} autoFocus/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="accountType">Gender</Form.Label>
                    <select className="form-select" name="gender" onChange={(e)=>setGender(e.target.value)} value={gender} >
                        <option value={""}>--select--</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>others</option>
                    </select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="age" >Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" name="age" value={age} readOnly/>
                    <small>Age should always be greater then 0.</small>
                </Form.Group>
            </Form>
        </div>
    );
};

export default RegisterForm3;