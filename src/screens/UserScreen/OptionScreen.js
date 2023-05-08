import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OptionImg from '../../assets/img/OptionImg.png';
import { Container, Row , Col, Button , Image } from "react-bootstrap";

const OptionScreen = () => {

    const navigate = useNavigate();
    
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
        navigate("/options");
        }
    }, [navigate]);

    return (
        <div className="main mt-0" fluid="md">
            <Container>
            <Row>
                <Col xs={6} md={4} className="imgCls m-auto">
                    <Image src={OptionImg} fluid />
                </Col>
                <Col xs={12} md={8} className="align-self-center">
                    <Row className='m-auto text-center'>
                        <div className="intro-text mt-2">
                            <h4 className="title">Get Started To Vaccinated</h4>
                            <p className="subtitle">Vaccine Ensured , Life Secured</p>
                        </div>
                        <div className="buttonContainer mt-2">
                            <div className="registerBtn">
                                <Link to="/">
                                    <Button className=" btn-success" >
                                        New to website
                                    </Button>
                                </Link>
                            </div>
                            <div className="loginBtn">
                                <Link to="/login">
                                    <Button className="btn-success" >
                                        Already a User
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Row>
                </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OptionScreen;