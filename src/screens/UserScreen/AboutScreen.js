import React, { useEffect } from 'react';
import MainScreen from '../../layout/MainScreen';
import secure from '../../assets/img/Secure.png';
import doctors from '../../assets/img/Doctors.png';
import patients from '../../assets/img/Patient.png';
import AvsImg from '../../assets/img/AvsWelcome.png';
import certificate from '../../assets/img/Certificate.png';
import TwoFactAuth from '../../assets/img/TwoFactAuth.png';
import { collapseNavbar } from '../../utils/collapseNavbar';
import { Col, Container, Image, Row } from 'react-bootstrap';
import highValidation from '../../assets/img/HighValidation.png';

const AboutScreen = () => {

    useEffect(() => {
        collapseNavbar();
    },[]);

    return (
        <>
            <MainScreen title="ABOUT US" fluid="md">
                <Container style={{minHeight : "50vh"}} className='d-flex'>
                    <Row className='flex-column flex-md-row'>
                        <Col xs={12} md={4} className="m-auto">
                            <Image src={AvsImg} fluid />
                        </Col>
                        <Col xs={12} md={6} className='d-flex'>
                            <div className='m-auto text-center'>
                                <h4>Welcome to Anand Vaccination System.</h4>
                                <p>
                                    AVS is a secure MERN stack web app designed for precise vaccination. We ensure stringent validation to eliminate errors, offer vaccination status tracking, provide secure certification issuance, and facilitate safe travel.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <hr />
                <h5 className='text-center'>Key Features of AVS</h5>
                <hr />
                <Container>
                    <Row className='flex-column flex-md-row'>
                        <Col xs={12} md={6} className='d-flex'>
                            <div className='m-auto text-center'>
                                <h4>High Security with Two-Step Authentication</h4>
                                <p>
                                    AVS ensures high security with a two-step user authentication system. Users must provide their Aadhaar number, account type, and password to proceed. An OTP is sent to their registered email for added security.
                                </p>
                            </div>
                        </Col>
                        <Col xs={12} md={4} className="m-auto">
                            <Image src={TwoFactAuth} fluid />
                        </Col>
                    </Row>
                    <hr className='d-md-none'/>
                    <Row className='flex-column-reverse flex-md-row'>
                        <Col xs={12} md={4} className="m-auto">
                            <Image src={highValidation} fluid />
                        </Col>
                        <Col xs={12} md={6} className='d-flex'>
                            <div className='m-auto text-center'>
                                <h4>Precision with High Validation</h4>
                                <p>
                                    AVS employs high validation to minimize errors. We have strict type and input validations at every step to ensure a seamless and error-free process.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <hr className='d-md-none'/>
                    <Row className='flex-column flex-md-row'>
                        <Col xs={12} md={6} className='d-flex'>
                            <div className='m-auto text-center'>
                                <h4>Doctor-Focused Dashboard</h4>
                                <p>
                                    AVS features specialized dashboards for doctors, empowering them to manage vaccines, appointments, and patient vaccinations with ease.
                                </p>
                            </div>
                        </Col>
                        <Col xs={12} md={4} className="m-auto">
                            <Image src={doctors} fluid />
                        </Col>
                    </Row>
                    <hr className='d-md-none'/>
                    <Row className='flex-column-reverse flex-md-row'>
                        <Col xs={12} md={4} className="m-auto">
                            <Image src={patients} fluid />
                        </Col>
                        <Col xs={12} md={6} className='d-flex'>
                            <div className='m-auto text-center'>
                                <h4>User-Friendly Patient Experience</h4>
                                <p>
                                    AVS offers a user-friendly interface for patients to book, edit, and delete appointments, track vaccination status, and access vaccination information.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <hr className='d-md-none'/>
                    <Row className='flex-column flex-md-row'>
                        <Col xs={12} md={6} className='d-flex'>
                            <div className='m-auto text-center'>
                                <h4>Secure Certification</h4>
                                <p>
                                    AVS provides vaccination certificates for your records. Easily download them, send them via email, or preview them live to keep your vaccination history secure.
                                </p>
                            </div>
                        </Col>
                        <Col xs={12} md={4} className="m-auto">
                            <Image src={certificate} fluid />
                        </Col>
                    </Row>
                    <hr className='d-md-none'/>
                    <Row className='flex-column-reverse flex-md-row'>
                        <Col xs={12} md={4} className="m-auto">
                            <Image src={secure} fluid />
                        </Col>
                        <Col xs={12} md={6} className='d-flex'>
                            <div className='m-auto text-center'>
                                <h4>Your Family's Safety Matters</h4>
                                <p>
                                    At AVS, your family's safety is our top priority. We are dedicated to securing every member of your family. Saving lives brings us the greatest happiness.
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