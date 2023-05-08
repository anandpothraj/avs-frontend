import React , { createContext, useState } from 'react';

export const Login  = createContext();

const LoginContext = ({children}) => {

    const [ aadhaar, setAadhaar] = useState("");
    const [ password, setPassword] = useState("");
    const [ secretCode, setSecretCode] = useState("");

  return (
    <Login.Provider value={{aadhaar, setAadhaar, password, setPassword, secretCode, setSecretCode}}>{children}</Login.Provider>
  )
};

export default LoginContext;