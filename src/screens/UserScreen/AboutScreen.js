import React from 'react';
import MainScreen from '../../layout/MainScreen';
import AboutImg from '../../assets/img/AboutBg.png';
import { Col, Container, Image, Row } from 'react-bootstrap';

const AboutScreen = () => {
    return (
        <>
            <MainScreen title="ABOUT US">
                <div className="main mt-0" fluid="md">
                    <Container>
                        <Row>
                            <Col className="img" xs={6} md={6}>
                                <Image src={AboutImg} fluid  />
                            </Col>
                            <Col className='d-flex' xs={12} md={6}>
                                <div className='m-auto'>
                                    <p>
                                        <b>Welcome To Anand Vaccination System.</b>
                                    </p>
                                    <span>Hii. I am Anand Pothraj (Full Stack Web Developer).</span>
                                    <ul>
                                        <li>We provide vaccination services.</li>
                                        <li>Accurate and secured vaccination facility.</li>
                                        <li>High validation for proper vaccination.</li>
                                        <li>Ensuring your health safety by providing value in your life</li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MainScreen>   
        </>
    );
};

export default AboutScreen;