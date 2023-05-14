import { Form } from 'react-bootstrap' ;
import React, { useContext } from 'react';
import { Step } from '../../../Context/Context';
import { Register } from '../../../Context/RegisterContext';

const RegisterForm3 = (props) => {
    
    const { step } = useContext(Step);
    const { age, setAge, dob, setDob, gender, setGender} = useContext(Register);
  
    const getAge = (dateBirth) => {
        var today = new Date();
        var birthDate = new Date(dateBirth);
        var year = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            setAge(year);
        }
        return setAge(year);
    }

    return (
        <div className="form-container">
            <h3 className="mb-1">{step}. {props.title} </h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="dob" >Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Enter Date of Birth" name="dob" onChange={(e)=>{setDob(e.target.value);getAge(e.target.value)}} value={dob} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor="accountType" className="form-label">Gender</label>
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
                </Form.Group>
            </Form>
        </div>
    );
};

export default RegisterForm3;