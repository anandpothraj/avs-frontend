import { isJson } from '../../utils/isJson';
import { Step } from '../../Context/Context';
import { useNavigate } from "react-router-dom";
import MainScreen from '../../layout/MainScreen';
import ErrorBg from '../../assets/img/Error.png';
import LogImg from '../../assets/img/LoginBg.png';
import React, { useContext, useEffect } from 'react';
import { collapseNavbar } from '../../utils/collapseNavbar';
import { Container, Row , Col , Image} from 'react-bootstrap';
import LoginForm from '../../components/Form/LoginForm/LoginForm';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

const LoginScreen = () => {

    const navigate = useNavigate();
    const step  = useContext(Step);

    useEffect(() => {
        collapseNavbar();
        // fetching user from localstorage
        let user = localStorage.getItem("user");
        // if user exist then check the json is valid or not and if user is not exist then redirect to "/"
        if (user && isJson(user)) {
            user = JSON.parse(user);
            let accountType = user.data.accountType.toLowerCase();
            navigate(`/${accountType}`);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <MainScreen title="LOGIN">
            <div className='main' fluid="md">
                <Container>
                    <Row>
                        <Col className='d-sm-none d-md-flex d-xs-none' sm={0} md={4}>
                            <Image className='m-auto' src={(step === 4)?(ErrorBg):(LogImg)} fluid/>
                        </Col>
                        <Col className='d-flex'>
                            <div className="m-auto">
                                <ProgressBar noOfSteps={3} progressBarType={"login"} formClass={"loginLi"}/>
                                <LoginForm/> 
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </MainScreen>
    );
};

export default LoginScreen;