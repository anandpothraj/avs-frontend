import axios from 'axios';
import {  Button } from 'react-bootstrap';
import { notify } from '../../utils/notify';
import server from '../../config/server.json';
import { useNavigate } from 'react-router-dom';
import MainScreen from '../../layout/MainScreen';
import React, { useState, useEffect } from 'react';
import { redirectUser } from '../../utils/redirectUser';
import { collapseNavbar } from '../../utils/collapseNavbar';
import AppointmentModal from '../../components/modal/ApointmentModal';

const PatientScreen = () => {
  
  const navigate = useNavigate();
  const initialBlankValue = "--select--";
  const [ user, setUser ] = useState({});
  const [ userId, setUserId ] = useState(null);
  const production = server.url.production;
  const [ vaccines, setVaccines ] = useState([{
    vaccineName : initialBlankValue
  }]);
  const [ loading, setLoading ] = useState(false);
  const FETCH_VACCINES = server.api.FETCH_VACCINES;
  const BOOK_APPOINTMENT = server.api.BOOK_APPOINTMENT;
  const [ selectedDose, setSelectedDose ] = useState(initialBlankValue);
  const [ selectedVaccine, setSelectedVaccine ] = useState(initialBlankValue);
  const [ vaccineDose, setVaccineDose ] = useState([initialBlankValue]);
  const [ showAppointmentModal, setShowAppointmentModal ] = useState(false);

  const resetFields = () => {
    setSelectedDose(initialBlankValue);
    setSelectedVaccine(initialBlankValue);
    updateNoOfDoseArray();
  }

  const openAppointmentModal = () => {
    setShowAppointmentModal(true);
  }

  const closeAppointmentModal = () => {
    setShowAppointmentModal(false);
    resetFields();
  }

  const updateNoOfDoseArray = (maxDose) => {
    const noOfDoseArray = Array.from({ length: maxDose }, (_, index) => index + 1);
    const updatedDoseArray = [ initialBlankValue, ...noOfDoseArray ];
    setVaccineDose(updatedDoseArray);
  };
  
  const handleVaccine = (vaccineName) => {
    setSelectedVaccine(vaccineName);
    const selectedVaccine = vaccines.find(vaccine => vaccine.vaccineName === vaccineName);
    if (selectedVaccine) {
      updateNoOfDoseArray(selectedVaccine.noOfDose);
      setSelectedDose(initialBlankValue);
    }
    else{
      setVaccineDose([initialBlankValue]);
    }
  }

  const fetchVaccines = async () => {
    setLoading(true);
    await axios
    .get(`${production}${FETCH_VACCINES}`)
    .then(res => {
      if(res.status === 200){
        if(res.data?.length === 0){
          notify("error", "No vaccine found!");
        };
        if(vaccines.length === 1){
          const updatedVaccines = [...vaccines, ...res.data];
          setVaccines(updatedVaccines);
        }
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    })
    setLoading(false);
  }

  const bookAppointment = async () => {
    if(selectedVaccine !== initialBlankValue && selectedDose !== initialBlankValue){
      setLoading(true);
      let data = { 
        userId : userId, 
        doseNo : selectedDose,
        vaccineName : selectedVaccine
      }
      await axios
      .post(`${production}${BOOK_APPOINTMENT}`,data)
      .then(res => {
        if(res.status === 201){
          resetFields();
          closeAppointmentModal();
          notify("success",res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
        notify("error",err.response.data.message);
      })
      setLoading(false);
    }
    else{
      notify("error", "Please select all the fields!")
    }
  }

  useEffect(() => {
    collapseNavbar();
    const accountType = redirectUser();
    navigate(`/${accountType}`);
    fetchVaccines();
    if(accountType){
      let patient = JSON.parse(localStorage.getItem("user"));
      if(patient){
        setUser(patient);
        setUserId(patient._id);
      }
    };
    // eslint-disable-next-line
  },[]);

  return (
    <MainScreen title="Welcome To AVS!" fluid="md">
      <Button variant="outline-success" onClick={openAppointmentModal}>Book Appointment</Button>
      <hr />
      <div className='my-2'>
        <h5>Vaccination status</h5>
        <hr/>
      </div>
      <AppointmentModal 
        user={user}
        loading={loading} 
        vaccines={vaccines}
        title="Book Appointment" 
        vaccineDose={vaccineDose}
        resetFields={resetFields} 
        selectedDose={selectedDose}
        show={showAppointmentModal} 
        handleVaccine={handleVaccine}
        onHide={closeAppointmentModal} 
        selectedVaccine={selectedVaccine}
        bookAppointment={bookAppointment}
        setSelectedDose={setSelectedDose}
        initialBlankValue={initialBlankValue}
        setSelectedVaccine={setSelectedVaccine}
      />
    </MainScreen> 
  );
};

export default PatientScreen;