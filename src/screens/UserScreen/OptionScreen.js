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
        <div className="main" fluid="md">
            <Container>
                <Row>
                    <Col xs={9} md={4} className="m-auto">
                        <Image src={OptionImg} fluid className="mb-4"/>
                    </Col>
                    <Col xs={12} md={8} className="d-flex">
                        <div className="m-auto text-center">
                            <div>
                                <h4>Get Started To Vaccinated</h4>
                                <p>Vaccine Ensured , Life Secured</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <Link to="/register"><Button variant="success" size="sm">New to website</Button></Link>
                                <Link to="/login"><Button variant="success" size="sm">Already a User</Button></Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OptionScreen;