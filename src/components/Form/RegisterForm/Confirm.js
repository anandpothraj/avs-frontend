import { BiEdit } from 'react-icons/bi';
import React , { useContext } from 'react';
import { Step } from '../../../Context/Context';
import { Register } from '../../../Context/RegisterContext';

const Confirm = (props) =>  {

  const { step, setStep } = useContext(Step);
  const { accountType, name, aadhaar, email, phone, password, secretCode, age, dob, gender} = useContext(Register);

    return (
        <div className="form-container">
            <h5 className="mb-2">{step}. {props.title}</h5>
            <ul className="list-group" style={{display:"flex",flexDirection:"column"}}>
                <li className="list-group-item p-1" >Account Type : {accountType} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(1)}/> </li>
                <li className="list-group-item p-1">Aadhaar Number: {aadhaar} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(1)}/> </li>
                <li className="list-group-item p-1">Name: {name} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(1)}/> </li>
                <li className="list-group-item p-1" style={{overflow:"auto"}}>Email: {email} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(2)}/> </li>
                <li className="list-group-item p-1">Phone Number: {phone} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(2)}/> </li>
                <li className="list-group-item p-1">Age: {age} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(3)}/> </li>
                <li className="list-group-item p-1">Date Of Birth: {dob} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(3)}/> </li>
                <li className="list-group-item p-1">Gender: {gender} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(3)}/> </li>
                <li className="list-group-item p-1">Password: {password} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(2)}/> </li>
                <li className="list-group-item p-1">Secret Code: {secretCode} <BiEdit color='#77b300' cursor="pointer" onClick={()=>setStep(2)}/> </li>
            </ul>
        </div>
    );
};

export default Confirm;