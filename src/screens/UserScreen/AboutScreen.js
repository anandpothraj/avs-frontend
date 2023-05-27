import React from 'react';
import MainScreen from '../../layout/MainScreen';
import AboutImg from '../../assets/img/AboutBg.png';
import { Col, Container, Image, Row } from 'react-bootstrap';

const AboutScreen = () => {
    return (
        <>
            <MainScreen title="ABOUT US" fluid="md">
                <Container style={{minHeight : "70vh"}} className='d-flex'>
                    <Row>
                        <Col xs={9} md={4} className="m-auto">
                            <Image src={AboutImg} fluid />
                        </Col>
                        <Col xs={12} md={8} className='d-flex'>
                            <div className='m-auto text-center'>
                                <h4>Welcome To Anand Vaccination System.</h4>
                                <p>Hii, Myself Anand Pothraj (MERN Stack Developer). This vaccination system is build as my final year project.
                                    It is responsible for providing accurate and secured vaccination facility with high validation and safety standard.
                                    Creating value in your life by ensuring your health safety.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </MainScreen>   
        </>
    );
};

export default AboutScreen;