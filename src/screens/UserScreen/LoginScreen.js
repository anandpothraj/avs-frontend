import { Step } from '../../Context/Context';
import { useNavigate } from "react-router-dom";
import MainScreen from '../../layout/MainScreen';
import ErrorBg from '../../assets/img/Error.png';
import LogImg from '../../assets/img/LoginBg.png';
import React, { useContext, useEffect } from 'react';
import { Container, Row , Col , Image} from 'react-bootstrap';
import LoginForm from '../../components/Form/LoginForm/LoginForm';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

const LoginScreen = () => {

    const navigate = useNavigate();
    const step  = useContext(Step);

    // This function takes an json and return true if the json is valid and false if json is invalid
    const isJson = (json) => {
        try {
        JSON.parse(json);
        } catch (e) {
        return false;
        }
        return true;
    };

    useEffect(() => {
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
            <div className="main mt-0" fluid="md">
                <Container>
                    <Row>
                        <Col className="img" xs={6} md={4}>
                            <Image src={(step === 4)?(ErrorBg):(LogImg)} fluid  className="logImg"/>
                        </Col>
                        <Col>
                            <ProgressBar noOfSteps={3} progressBarType={"login"}/>
                            <LoginForm/> 
                        </Col>
                    </Row>
                </Container>
            </div>
        </MainScreen>
    );
};

export default LoginScreen;