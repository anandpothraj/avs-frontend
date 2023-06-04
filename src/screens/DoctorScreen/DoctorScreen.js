import React from 'react'
import { Link } from 'react-router-dom';
import MainScreen from '../../layout/MainScreen';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { Button, Container, Col, Row } from 'react-bootstrap';

const DoctorScreen = () => {

  return (
    <MainScreen title="Welcome To AVS!" fluid="md">
      <Container className="my-3" style={{minHeight: "50vh"}}>
      <Row>
        <Col className='d-flex'>
          {/* <Link className='m-auto' to='/'> */}
            <Button  variant='outline-success'>Vaccinate Patient</Button>
          {/* </Link> */}
        </Col>
        <Col className='d-flex'>
          <Link className='m-auto' to='/doctor/vaccineinfo'>
            <Button variant='outline-info'>Vaccine Dashboard<IoChevronForwardSharp/></Button>
          </Link>
        </Col>
      </Row>
    </Container>
    </MainScreen>
  );
};

export default DoctorScreen;