import Fail from '../Fail';
import React, { useContext } from 'react';
import { Step } from '../../../Context/Context';
import ForgotPasswordContext from '../../../Context/ForgotPasswordContext';
import ForgotPasswordNavigator from '../../FormNavigator/ForgotPasswordNavigator';
import ForgotPasswordForm1 from '../../Form/ForgotPasswordForm/ForgotPasswordForm1';
import ForgotPasswordForm2 from '../../Form/ForgotPasswordForm/ForgotPasswordForm2';
import ForgotPasswordFormSuccess from '../../Form/ForgotPasswordForm/ForgotPasswordFormSuccess';

const ForgotPasswordForm = () => {

    const { step } = useContext(Step);

    return (
        <ForgotPasswordContext>
            {(() => {
                switch (step) {
                    case 1:return (<ForgotPasswordForm1/>)
                    case 2:return (<ForgotPasswordForm2/>)
                    case 3:return (<ForgotPasswordFormSuccess success={"updated the password"} loading={"Redirecting to login"}/>)
                    case 4:return (<Fail error={"Unable to generate new password"} redirect={"/forgot/password"}/>)
                    default:return (<ForgotPasswordForm1/>)
                }
            })()}
            <ForgotPasswordNavigator FormType={"Forgot Password"}/>
        </ForgotPasswordContext>
    )

};

export default ForgotPasswordForm;