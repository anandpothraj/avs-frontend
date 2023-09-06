import axios from 'axios';
import { notify } from '../../utils/notify';
import server from '../../config/server.json';
import { useNavigate } from 'react-router-dom';
import MainScreen from '../../layout/MainScreen';
import React, { useState, useEffect } from 'react';
import { redirectUser } from '../../utils/redirectUser';
import { collapseNavbar } from '../../utils/collapseNavbar';
import BookAppointment from '../../components/patient/BookAppointment';
import FetchAppointments from '../../components/patient/FetchAppointments';

const PatientScreen = () => {

  const navigate = useNavigate();
  const initialBlankValue = "--select--";
  const [ user, setUser ] = useState({});
  const production = server.url.production;
  const [ userId, setUserId ] = useState(null);
  const [ vaccines, setVaccines ] = useState([{
    vaccineName : initialBlankValue
  }]);
  const [ loading, setLoading ] = useState(false);
  const FETCH_VACCINES = server.api.FETCH_VACCINES;
  const BOOK_APPOINTMENT = server.api.BOOK_APPOINTMENT;
  const [ appointments, setAppointments ] = useState([]);
  const FETCH_APPOINTMENTS = server.api.FETCH_APPOINTMENTS;
  const [ vaccineDose, setVaccineDose ] = useState([initialBlankValue]);
  const [ selectedDose, setSelectedDose ] = useState(initialBlankValue);
  const [ showAppointmentModal, setShowAppointmentModal ] = useState(false);
  const [ selectedVaccine, setSelectedVaccine ] = useState(initialBlankValue);

  const fetchAppointments = async (id) => {
    let payload;
    userId ? payload = userId : payload = id;
    setLoading(true);
    await axios
    .get(`${production}${FETCH_APPOINTMENTS}/${payload}`)
    .then(res => {
      if(res.status === 200){
        setAppointments(res.data);
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    })
    setLoading(false);
  }

  const calculateTimeToExpire = (updatedAt) => {
      const updatedDate = new Date(updatedAt);
      const expirationDate = new Date(updatedDate);
      expirationDate.setHours(updatedDate.getHours() + 48);
      const currentDate = new Date();
      const remainingTimeMillis = expirationDate - currentDate;
      return remainingTimeMillis;
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

  const resetFields = () => {
    setSelectedDose(initialBlankValue);
    setSelectedVaccine(initialBlankValue);
    updateNoOfDoseArray();
  }

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
    fetchAppointments(userId);
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
        fetchAppointments(patient._id);
      }
    };
    // eslint-disable-next-line
  },[]);

  return (
    <MainScreen title="Welcome To AVS!" fluid="md">
      <BookAppointment 
        user={user}
        loading={loading}
        vaccines={vaccines}
        vaccineDose={vaccineDose}
        resetFields={resetFields}
        selectedDose={selectedDose}
        handleVaccine={handleVaccine}
        selectedVaccine={selectedVaccine}
        bookAppointment={bookAppointment}
        setSelectedDose={setSelectedDose}
        initialBlankValue={initialBlankValue}
        setSelectedVaccine={setSelectedVaccine}
        openAppointmentModal={openAppointmentModal}
        showAppointmentModal={showAppointmentModal}
        closeAppointmentModal={closeAppointmentModal}
      />
      <hr />
      <FetchAppointments
        user={user}
        loading={loading}
        vaccines={vaccines}
        vaccineDose={vaccineDose}
        resetFields={resetFields}
        selectedDose={selectedDose}
        appointments={appointments}
        handleVaccine={handleVaccine}
        selectedVaccine={selectedVaccine}
        bookAppointment={bookAppointment}
        setSelectedDose={setSelectedDose}
        initialBlankValue={initialBlankValue}
        setSelectedVaccine={setSelectedVaccine}
        openAppointmentModal={openAppointmentModal}
        showAppointmentModal={showAppointmentModal}
        closeAppointmentModal={closeAppointmentModal}
        calculateTimeToExpire={calculateTimeToExpire}
    />
    </MainScreen> 
  );
};

export default PatientScreen;