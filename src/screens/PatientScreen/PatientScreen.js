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
  const [ id, setId ] = useState(null);
  const initialBlankValue = "--select--";
  const [ user, setUser ] = useState({});
  const production = server.url.production;
  const [ userId, setUserId ] = useState(null);
  const [ vaccines, setVaccines ] = useState([{
    vaccineName : initialBlankValue
  }]);
  const [ filter, setFilter ] = useState("all");
  const [ lastDose, setLastDose ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ appointments, setAppointments ] = useState([]);
  const [ expiringTime, setExpiringTime ] = useState("");
  const FETCH_VACCINES = server.api.doctors.FETCH_VACCINES;
  const [ operationType, setOperationType ] = useState(null);
  const [ allAppointments, setAllAppointments ] = useState([]);
  const BOOK_APPOINTMENT = server.api.patients.BOOK_APPOINTMENT;
  const EDIT_APPOINTMENT = server.api.patients.EDIT_APPOINTMENT;
  const [ appointmentName, setAppointmentName ] = useState(null);
  const [ showDeleteModal, setShowDeleteModal ] =  useState(false);
  const FETCH_APPOINTMENTS = server.api.patients.FETCH_APPOINTMENTS;
  const REMOVE_APPOINTMENT = server.api.patients.REMOVE_APPOINTMENT;
  const [ vaccineDose, setVaccineDose ] = useState([initialBlankValue]);
  const [ selectedDose, setSelectedDose ] = useState(initialBlankValue);
  const [ showAppointmentModal, setShowAppointmentModal ] = useState(false);
  const [ selectedVaccine, setSelectedVaccine ] = useState(initialBlankValue);

  const filterAppointments = () => {
    let filteredAppointment;
    if(filter === "active" || filter === "deactive"){
      filteredAppointment = allAppointments.filter(appointment => appointment.status === filter);
      setAppointments(filteredAppointment);
    }
    else{
      setAppointments(allAppointments);
    }
  }

  const fetchAppointments = async (id) => {
    let payload;
    userId ? payload = userId : payload = id;
    setLoading(true);
    await axios
    .get(`${production}${FETCH_APPOINTMENTS}/${payload}`)
    .then(res => {
      if(res.status === 200){
        setAllAppointments(res.data.appointments);
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
    setOperationType("Book");
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
    setId(null);
    updateNoOfDoseArray();
    setAppointmentName(null);
    setExpiringTime("");
    setSelectedDose(initialBlankValue);
    setSelectedVaccine(initialBlankValue);
  }

  const handleVaccine = (vaccineName) => {
    setSelectedVaccine(vaccineName);
    const selectedVaccine = vaccines.find(vaccine => vaccine.vaccineName === vaccineName);
    if (selectedVaccine) {
      setSelectedDose(initialBlankValue);
      setLastDose(selectedVaccine.noOfDose);
      updateNoOfDoseArray(selectedVaccine.noOfDose);
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
          maxDose : lastDose,
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

  const editAppointment = async () => {
    if(selectedVaccine !== initialBlankValue && selectedDose !== initialBlankValue){
      setLoading(true);
      let data = { 
          id : id, 
          userId : userId,
          doseNo : selectedDose,
          vaccineName : selectedVaccine
      }
      await axios
      .put(`${production}${EDIT_APPOINTMENT}`,data)
      .then(res => {
        if(res.status === 200){
          resetFields();
          closeEditAppointmentModal();
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

  const openEditAppointmentModal = (_id, vaccineName, doseNo, updatedAt) => {
    setId(_id);
    setOperationType("Edit");
    handleVaccine(vaccineName);
    setShowAppointmentModal(true);
    setSelectedDose(doseNo);
    if(calculateTimeToExpire(updatedAt)  > 1){
      setExpiringTime(`${Math.floor(calculateTimeToExpire(updatedAt) / (1000 * 60 * 60))} hours.`)
    }
    else{
      setExpiringTime(`${Math.floor(calculateTimeToExpire(updatedAt) / (1000 * 60))} mins.`)
    }
  }

  const closeEditAppointmentModal = () => {
    setShowAppointmentModal(false);
    resetFields();
  }

  const openDeleteModal = (name, id) => {
    setId(id);
    setAppointmentName(name);
    setShowDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    resetFields();
  }

  const deleteAppointment = async () => {
    setLoading(false);
    await axios
    .delete(`${production}${REMOVE_APPOINTMENT}/${id}`)
    .then(res => {
      if(res.status === 202){
        closeDeleteModal();
        notify("success",res.data.message);
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    });
    fetchAppointments();
    setLoading(true);
  };

  useEffect(() => {
    filterAppointments();
    // eslint-disable-next-line
  },[filter, allAppointments])
  
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
        operationType={operationType}
        handleVaccine={handleVaccine}
        selectedVaccine={selectedVaccine}
        bookAppointment={bookAppointment}
        setSelectedDose={setSelectedDose}
        editAppointment={editAppointment}
        setOperationType={setOperationType}
        initialBlankValue={initialBlankValue}
        setSelectedVaccine={setSelectedVaccine}
        openAppointmentModal={openAppointmentModal}
        showAppointmentModal={showAppointmentModal}
        closeAppointmentModal={closeAppointmentModal}
      />
      <hr />
      <FetchAppointments
        user={user}
        filter={filter}
        loading={loading}
        vaccines={vaccines}
        setFilter={setFilter}
        vaccineDose={vaccineDose}
        resetFields={resetFields}
        selectedDose={selectedDose}
        appointments={appointments}
        expiringTime={expiringTime}
        handleVaccine={handleVaccine}
        operationType={operationType}
        editAppointment={editAppointment}
        openDeleteModal={openDeleteModal}
        selectedVaccine={selectedVaccine}
        bookAppointment={bookAppointment}
        setSelectedDose={setSelectedDose}
        appointmentName={appointmentName}
        showDeleteModal={showDeleteModal}
        setOperationType={setOperationType}
        closeDeleteModal={closeDeleteModal}
        fetchAppointments={fetchAppointments}
        initialBlankValue={initialBlankValue}
        deleteAppointment={deleteAppointment}
        setSelectedVaccine={setSelectedVaccine}
        openAppointmentModal={openAppointmentModal}
        showAppointmentModal={showAppointmentModal}
        closeAppointmentModal={closeAppointmentModal}
        calculateTimeToExpire={calculateTimeToExpire}
        openEditAppointmentModal={openEditAppointmentModal}
        closeEditAppointmentModal={closeEditAppointmentModal}
      />
    </MainScreen> 
  );
};

export default PatientScreen;