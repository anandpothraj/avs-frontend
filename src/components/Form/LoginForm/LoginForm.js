import Fail from '../Fail';
import LoginForm1 from './LoginForm1';
import LoginForm2 from './LoginForm2';
import LoginSuccess from './LoginSuccess';
import React, { useContext } from 'react';
import { Step } from '../../../Context/Context';
import LoginContext from '../../../Context/LoginContext';
import LoginFormNavigator from '../../../components/FormNavigator/FormNavigator';

const LoginForm = () => {

    const { step } = useContext(Step);

    return (
        <>
            <LoginContext>
                {(() => {
                    switch (step) {
                        case 1:return (<LoginForm1/>)
                        case 2:return (<LoginForm2 />)
                        case 3:return (<LoginSuccess success={"Logged In"} loading={"Entering AVS"}/>)
                        case 4:return (<Fail error={"Unable To Login"} redirect={"/login"}/>)
                        default:return (<LoginForm1/>)
                    }
                })()}
                <LoginFormNavigator FormType={"Login"}/>
            </LoginContext>
        </>
    )

};

export default LoginForm;