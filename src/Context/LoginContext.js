import React , { createContext, useState } from 'react';

export const Login  = createContext();

const LoginContext = ({children}) => {

  const [ otp, setOtp] = useState("");
  const [ email, setEmail] = useState("");
  const [ aadhaar, setAadhaar] = useState("");
  const [ seconds, setSeconds] = useState(60);
  const [ password, setPassword] = useState("");
  const [ isActive, setIsActive] = useState(true);
  const [ accountType, setAccountType] = useState("Patient");

  return (
    <Login.Provider value={{aadhaar, setAadhaar, password, setPassword, otp, setOtp, accountType, setAccountType, email, setEmail, seconds, setSeconds, isActive, setIsActive}}>{children}</Login.Provider>
  )
};

export default LoginContext;