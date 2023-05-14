import Fail from '../Fail';
import Confirm from './Confirm';
import React, { useContext } from 'react';
import RegisterForm1 from './RegisterForm1';
import RegisterForm2 from './RegisterForm2';
import RegisterForm3 from './RegisterForm3';
import RegisterSuccess from './RegisterSuccess';
import { Step } from '../../../Context/Context';
import RegisterContext from '../../../Context/RegisterContext';
import RegisterFormNavigator from '../../FormNavigator/RegisterFormNavigator';

const RegisterForm = () => {

  const { step } = useContext(Step);
    
    return (
        <>
            <RegisterContext>
                {(() => {
                    switch (step) {
                        case 1:return (<RegisterForm1 title={"Account Setup"} />)
                        case 2:return (<RegisterForm2 title={"Contact Details"}/>)
                        case 3:return (<RegisterForm3 title={"Personal Details"}/>)
                        case 4:return (<Confirm title={"Confirm Details"}/>)
                        case 5:return (<RegisterSuccess success={"Registered"} loading={"Redirecting To Login"}/>)
                        case 6:return (<Fail error={"Unable To Register"} redirect={"/register"}/>)
                        default:
                            return (<RegisterForm1/>)
                    }
                })()}
                <RegisterFormNavigator FormType={"Register"}/>
            </RegisterContext>
        </>
    );
};

export default RegisterForm;