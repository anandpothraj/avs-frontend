import axios from 'axios';
import { Link } from 'react-router-dom';
import { notify } from '../../utils/notify';
import server from '../../config/server.json';
import { useNavigate } from 'react-router-dom';
import AppointmentInfo from './AppointmentInfo';
import MainScreen from '../../layout/MainScreen';
import React, { useState, useEffect } from 'react';
import SearchAppointment from './SearchAppointment';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { redirectUser } from '../../utils/redirectUser';
import { collapseNavbar } from '../../utils/collapseNavbar';
import { Button, Container, Col, Row, Badge, ProgressBar } from 'react-bootstrap';

const DoctorScreen = () => {

  const navigate = useNavigate();
  const [ id, setId ] = useState("");
  const production = server.url.production;
  const [ loading, setLoading ] = useState(false);
  const [ patientAge, setPatientAge ] = useState("");
  const [ patientName, setPatientName ] = useState("");
  const [ appointments, setAppointments ] = useState([]);
  const [ patientGender, setPatientGender ] = useState("");
  const [ searchBy, setSearchBy ] = useState("--select--");
  const FETCH_APPOINTMENTS_BY_AADHAAR = server.api.doctors.FETCH_APPOINTMENTS_BY_AADHAAR;
  const FETCH_APPOINTMENT_BY_BOOKING_ID = server.api.doctors.FETCH_APPOINTMENT_BY_BOOKING_ID;

  const resetFields = () => {
    setId("");
    setPatientAge("");
    setPatientName("");
    setAppointments([]);
    setPatientGender("");
    setSearchBy("--select--");
  }

  const fetchAppointments = () => {
    if(searchBy !== "--select--" && id){
      if(searchBy === "Aadhaar"){
        if(id.length === 12){
          searchByAadhaar();
        }
        else{
          notify("error", "Invalid Aadhaar Number, Please add valid Aadhaar Number!");
        }
      }
      if(searchBy === "Appointment Id"){
        if(id.length === 24){
          searchByAppointmentId();
        }
        else{
          notify("error", "Invalid Appointment Id, Please add valid Appointment Id!");
        }
      }
    }
    else{
      notify("error", "Please fill all the fields!");
    }
  }

  const searchByAadhaar = async () => {
    setLoading(true);
    setAppointments("");
    await axios
    .get(`${production}${FETCH_APPOINTMENTS_BY_AADHAAR}/${id}`)
    .then(res => {
      if(res.status === 200){
        if(res.data?.length === 0){
          notify("error", "No vaccine found!");
        };
        setPatientAge(res.data.user.age);
        setPatientName(res.data.user.name);
        setPatientGender(res.data.user.gender);
        setAppointments(res.data.appointment);
        setId("");
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    })
    setLoading(false);
  }

  const searchByAppointmentId = async () => {
    setLoading(true);
    setAppointments("");
    await axios
    .get(`${production}${FETCH_APPOINTMENT_BY_BOOKING_ID}/${id}`)
    .then(res => {
      if(res.status === 200){
        if(res.data?.length === 0){
          notify("error", "No vaccine found!");
        };
        setPatientAge(res.data.user.age);
        setPatientName(res.data.user.name);
        setPatientGender(res.data.user.gender);
        setAppointments([res.data.appointment]);
        setId("");
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    })
    setLoading(false);
  }

  useEffect(() => {
    collapseNavbar();
    const accountType = redirectUser();
    navigate(`/${accountType}`);
    // eslint-disable-next-line
  },[]);

  return (
    <MainScreen title="Welcome To AVS!" fluid="md">
      <Container className="my-3" style={{ minHeight: "50vh" }}>
        <Row>
          <Col className='rounded d-none d-md-flex'>
            <Badge bg="success" className='d-flex rounded'>
              <h6 className='m-auto'>Vaccination Dashboard</h6>
            </Badge>
          </Col>
          <Col className='d-flex'>
            <Link className='m-auto' to='/doctor/vaccineinfo'>
              <Button variant='outline-info'>Vaccine Dashboard<IoChevronForwardSharp /></Button>
            </Link>
          </Col>
        </Row>
        <hr />
        <SearchAppointment
          id={id}
          setId={setId}
          loading={loading}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          resetFields={resetFields}
          appointments={appointments}
          fetchAppointments={fetchAppointments}
        />
        <hr />
        { loading && <ProgressBar striped animated variant="success" now={100}/>}
        <AppointmentInfo 
          patientAge={patientAge}
          patientName={patientName}
          appointments={appointments}
          patientGender={patientGender}
        />
      </Container>
    </MainScreen>
  );
};

export default DoctorScreen;