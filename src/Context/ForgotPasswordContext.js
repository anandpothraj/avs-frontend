import React , { createContext, useState } from 'react';

export const ForgotPassword  = createContext();

const ForgotPasswordContext = ({children}) => {

    const [ otp, setOtp] = useState("");
    const [ email, setEmail] = useState("");
    const [ aadhaar, setAadhaar] = useState("");
    const [ seconds, setSeconds] = useState(60);
    const [ password, setPassword] = useState("");
    const [ isActive, setIsActive] = useState(true);
    const [ accountType, setAccountType] = useState("Patient");

  return (
    <ForgotPassword.Provider value={{accountType, setAccountType, aadhaar, setAadhaar, email, setEmail, otp, setOtp, password, setPassword, seconds, setSeconds, isActive, setIsActive}}>{children}</ForgotPassword.Provider>
  )
};

export default ForgotPasswordContext;