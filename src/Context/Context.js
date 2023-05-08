import React, { useState, createContext } from "react";

export const Step = createContext();

const Context = ({children}) => {

  const [step, setStep] = useState(1);
  return (
    <Step.Provider value={{step, setStep}}>{children}</Step.Provider>
  )
};

export default Context;