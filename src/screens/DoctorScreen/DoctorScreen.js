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
import VaccinateModal from '../../components/modal/VaccinateModal';
import { Button, Container, Col, Row, Badge, ProgressBar } from 'react-bootstrap';

const DoctorScreen = () => {

  const navigate = useNavigate();
  const [ id, setId ] = useState("");
  const production = server.url.production;
  const [ doseNo, setDoseNo ] = useState("");
  const [ pincode, setPincode ] = useState("");
  const [ maxDose, setMaxDose ] = useState("");
  const [ doctorId, setDoctorId ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ patientId, setPatientId ] = useState("");
  const [ doctorName, setDoctorName ] = useState("");
  const [ patientAge, setPatientAge ] = useState("");
  const [ vaccineName, setVaccineName ] = useState("");
  const [ patientName, setPatientName ] = useState("");
  const [ appointments, setAppointments ] = useState("");
  const [ hospitalName, setHospitalName ] = useState("");
  const [ doctorAadhaar, setDoctorAadhaar ] = useState("");
  const [ searchBy, setSearchBy ] = useState("--select--");
  const [ patientGender, setPatientGender ] = useState("");
  const [ appointmentId, setAppointmentId ] = useState("");
  const [ patientAadhaar, setPatientAadhaar ] = useState("");
  const VACCINATE_PATIENT = server.api.doctors.VACCINATE_PATIENT;
  const [ showVaccinateModal, setShowVaccinateModal ] = useState(false);
  const FETCH_APPOINTMENTS_BY_AADHAAR = server.api.doctors.FETCH_APPOINTMENTS_BY_AADHAAR;
  const FETCH_APPOINTMENT_BY_BOOKING_ID = server.api.doctors.FETCH_APPOINTMENT_BY_BOOKING_ID;

  const resetFields = () => {
    setId("");
    setDoseNo("");
    setPincode("");
    setMaxDose("");
    setPatientId("");
    setLoading(false);
    setPatientAge("");
    setPatientName("");
    setVaccineName("");
    setPatientName("");
    setVaccineName("");
    setHospitalName("");
    setAppointments([]);
    setPatientGender("");
    setPatientGender("");
    setAppointmentId("");
    setPatientAadhaar("");
    setSearchBy("--select--");
  }

  const searchAppointments = () => {
    if(searchBy !== "--select--" && id){
      if(searchBy === "Aadhaar"){
        if(id.length === 12){
          fetchAppointments(FETCH_APPOINTMENTS_BY_AADHAAR);
        }
        else{
          notify("error", "Invalid Aadhaar Number, Please add valid Aadhaar Number!");
        }
      }
      if(searchBy === "Appointment Id"){
        if(id.length === 24){
          fetchAppointments(FETCH_APPOINTMENT_BY_BOOKING_ID);
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

  const fetchAppointments = async (payload) => {
    setLoading(true);
    setAppointments("");
    await axios
    .get(`${production}${payload}/${id}`)
    .then(res => {
      if(res.status === 200){
        if(res.data?.length === 0){
          notify("error", "No vaccine found!");
        };
        setPatientAge(res.data.user.age);
        setPatientId(res.data.user.userId);
        setPatientName(res.data.user.name);
        setPatientGender(res.data.user.gender);
        setPatientAadhaar(res.data.user.aadhaar);
        if(Array.isArray(res.data.appointment)){
          setAppointments(res.data.appointment);
        }
        else{
          setAppointments([res.data.appointment]);
        }
        setId("");
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    })
    setLoading(false);
  }

  const openVaccinateModal = (name, dose, totalDose, appId) => {
    setDoseNo(dose);
    setVaccineName(name);
    setMaxDose(totalDose);
    setAppointmentId(appId);
    setShowVaccinateModal(true);
  }

  const closeVaccinateModal = () => {
    setShowVaccinateModal(false);
    setDoseNo("");
    setPincode("");
    setMaxDose("");
    setLoading(false);
    setVaccineName("");
    setHospitalName("");
    setAppointmentId("");
  }

  const vaccinatePatient = async () => {
    if(patientName && patientAadhaar && patientAge && patientGender && vaccineName && doseNo && hospitalName && pincode && doctorId && doctorAadhaar && doctorName && patientId && maxDose && appointmentId){
      if(pincode.length === 6){
        setLoading(true);
        const data  = { patientId, vaccineName, doseNo, maxDose, hospitalName, pincode, doctorId, appointmentId }
        await axios
        .post(`${production}${VACCINATE_PATIENT}`, data)
        .then(res => {
          if(res.status === 201){
            resetFields();
            closeVaccinateModal();
            notify("success",res.data.message);
          }
        })
      }
      else{
        notify('error', "Invalid pincode, Please enter your 6 digits pincode!");
      }
    }
    else{
      notify('error', "Something went wrong please refresh the page and try again!")
    }
  }

  useEffect(() => {
    collapseNavbar();
    const accountType = redirectUser();
    navigate(`/${accountType}`);
    if(accountType){
      let userInfo = JSON.parse(localStorage.getItem("user"));
      if(userInfo){
        setDoctorId(userInfo._id)
        setDoctorName(userInfo.name);
        setDoctorAadhaar(userInfo.aadhaar);
      }
    }
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
          searchAppointments={searchAppointments}
        />
        <hr />
        { loading && <ProgressBar striped animated variant="success" now={100}/>}
        <AppointmentInfo 
          patientAge={patientAge}
          patientName={patientName}
          appointments={appointments}
          patientGender={patientGender}
          openVaccinateModal={openVaccinateModal}
        />
        <VaccinateModal
          loading={loading}
          pincode={pincode}
          vaccineDose={doseNo} 
          setPincode={setPincode}
          doctorName={doctorName}
          patientAge={patientAge} 
          vaccineName={vaccineName}
          show={showVaccinateModal}
          patientName={patientName}
          title={"Vaccinate Patient"}
          hospitalName={hospitalName}
          onHide={closeVaccinateModal}
          patientGender={patientGender} 
          patientAadhaar={patientAadhaar}
          setHospitalName={setHospitalName}
          vaccinatePatient={vaccinatePatient}
        />
      </Container>
    </MainScreen>
  );
};

export default DoctorScreen;