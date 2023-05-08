import axios from 'axios';
import { Button } from 'react-bootstrap';
import React , { useContext } from 'react';
import { Step } from '../../Context/Context';
import { Register } from '../../Context/RegisterContext';

const Confirm = (props) =>  {

  const { step , setStep } = useContext(Step);
  const { accountType, name, aadhaar, email, phone, password, secretCode, age, dob, gender} = useContext(Register);

    const next = (e) => {
        e.preventDefault();
        try{
            const data = { accountType, name, email, phone, password, secretCode, age, dob, gender, aadhaar };
            axios
                .post("/register",data)
                .then(res => {
                    setStep(step + 1);
                })
                .catch(err => {
                    console.log(err);
                    setStep(step + 2);
                })
        }catch(error){
            console.log(error);
            setStep(step + 2);
        }
    }
      
    const previous = (e) => {
        e.preventDefault();
        setStep(step - 1);
    };

    return (
        <div className="form-container">
            <h5 className="mb-2">{step}. {props.title}</h5>
            <ul className="list-group" style={{display:"flex",flexDirection:"column"}}>
                <li className="list-group-item p-1" >Account Type : {accountType} </li>
                <li className="list-group-item p-1">Name: {name} </li>
                <li className="list-group-item p-1" style={{overflow:"auto"}}>Email: {email} </li>
                <li className="list-group-item p-1">Phone Number: {phone} </li>
                <li className="list-group-item p-1">Password: {password} </li>
                <li className="list-group-item p-1">Secret Code: {secretCode} </li>
                <li className="list-group-item p-1">Age: {age} </li>
                <li className="list-group-item p-1">Date Of Birth: {dob} </li>
                <li className="list-group-item p-1">Gender: {gender} </li>
                <li className="list-group-item p-1">Aadhaar Number: {aadhaar} </li>
            </ul>
            <br />
            <div className="row">
                <div className="col-6">
                    <Button className="btn btn-danger" size="sm" onClick={previous}>Previous</Button>
                </div>
                <div className="col-6 text-right">
                    <Button className="btn btn-success" onClick={next} size="sm">Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;