import React, { createContext, useState } from 'react';

export const Register = createContext();

const RegisterContext = ({children}) => {

  const [ dob, setDob] = useState("");
  const [ age, setAge] = useState("");
  const [ name, setName] = useState("");
  const [ email, setEmail] = useState("");
  const [ phone, setPhone] = useState("");
  const [ gender, setGender] = useState("");
  const [ aadhaar, setAadhaar] = useState("");
  const [ password, setPassword] = useState("");
  const [ secretCode, setSecretCode] = useState("");
  const [ accountType, setAccountType] = useState("Patient");

  return (
    <Register.Provider value={{
      accountType, setAccountType, name, setName, aadhaar, setAadhaar, email, setEmail, password, 
      setPassword, secretCode, setSecretCode, phone, setPhone, age, setAge, dob, setDob, gender, setGender}}
    >
      {children}
    </Register.Provider>
  );
};

export default RegisterContext;