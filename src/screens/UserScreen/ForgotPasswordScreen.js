import { isJson } from '../../utils/isJson';
import { Step } from '../../Context/Context';
import { useNavigate } from "react-router-dom";
import MainScreen from '../../layout/MainScreen';
import ErrorBg from '../../assets/img/Error.png';
import Forgot1Img from '../../assets/img/Forgot1.png';
import Forgot2Img from '../../assets/img/Forgot2.png';
import React, { useContext, useEffect } from 'react';
import { collapseNavbar } from '../../utils/collapseNavbar';
import { Container, Row , Col , Image} from 'react-bootstrap';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import ForgotPasswordForm from '../../components/Form/ForgotPasswordForm/ForgotPasswordForm';

const ForgotPasswordScreen = () => {

    const navigate = useNavigate();
    const { step, setStep }  = useContext(Step);

    useEffect(() => {
        collapseNavbar();
        // fetching user from localstorage
        let user = localStorage.getItem("user");
        // if user exist then check the json is valid or not and if user is not exist then redirect to "/"
        if (user && isJson(user)) {
            user = JSON.parse(user);
            let accountType = user.data.accountType.toLowerCase();
            navigate(`/${accountType}`);
        } 
        else {
            navigate("/forgot/password");
            setStep(1);
        }
        // eslint-disable-next-line
    }, [navigate]);

    return (
        <MainScreen title="FORGOT PASSWORD">
            <div className='main' fluid="md">
                <Container>
                    <Row>
                        <Col className='d-sm-none d-md-flex d-xs-none' sm={0} md={4}>
                            {step === 1 && <Image className='m-auto' src={Forgot1Img} fluid/>}
                            {step === 2 && <Image className='m-auto' src={Forgot2Img} fluid/>}
                            {step === 4 && <Image className='m-auto' src={ErrorBg} fluid/>}
                        </Col>
                        <Col className='d-flex'>
                            <div className="m-auto">
                                <ProgressBar noOfSteps={3} progressBarType={"create new password"} formClass={"loginLi"}/>
                                <ForgotPasswordForm/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </MainScreen>
    );
};

export default ForgotPasswordScreen;