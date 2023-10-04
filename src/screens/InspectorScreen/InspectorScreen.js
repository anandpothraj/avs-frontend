import axios from 'axios';
import { notify } from '../../utils/notify';
import server from '../../config/server.json';
import { useNavigate } from 'react-router-dom';
import MainScreen from '../../layout/MainScreen';
import React, { useEffect, useState } from 'react';
import { redirectUser } from '../../utils/redirectUser';
import { collapseNavbar } from '../../utils/collapseNavbar';
import { Alert, Badge, Button, Container, Form, Spinner } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { MdMale } from 'react-icons/md';
import { TbVaccine } from 'react-icons/tb';
import { GiOverdose } from 'react-icons/gi';

const InspectorScreen = () => {

  const navigate = useNavigate();
  const initialBlankValue = "--select--";
  const production = server.url.production;
  const [ vaccines, setVaccines ] = useState([{
    vaccineName : initialBlankValue
  }]);
  const [ aadhaar, setAadhaar ] = useState("");
  const [ loading, setLoading ] = useState(true);
  const [ vaccinations, setVaccinations ] = useState([]);
  const FETCH_VACCINES = server.api.doctors.FETCH_VACCINES;
  const [ vaccineDose, setVaccineDose ] = useState([initialBlankValue]);
  const [ selectedDose, setSelectedDose ] = useState(initialBlankValue);
  const [ selectedVaccine, setSelectedVaccine ] = useState(initialBlankValue);

  const updateNoOfDoseArray = (maxDose) => {
    const noOfDoseArray = Array.from({ length: maxDose }, (_, index) => index + 1);
    const updatedDoseArray = [ initialBlankValue, ...noOfDoseArray ];
    setVaccineDose(updatedDoseArray);
  };

  const handleVaccine = (vaccineName) => {
    setSelectedVaccine(vaccineName);
    const selectedVaccine = vaccines.find(vaccine => vaccine.vaccineName === vaccineName);
    if (selectedVaccine) {
      setSelectedDose(initialBlankValue);
      updateNoOfDoseArray(selectedVaccine.noOfDose);
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
    // setLoading(false);
  }

  const resetFields = () => {
    setAadhaar("");
    setSelectedDose(initialBlankValue);
    setSelectedVaccine(initialBlankValue);
  }

  const searchVaccinations = () => {
    if(aadhaar && selectedVaccine !== initialBlankValue && selectedDose !== initialBlankValue){
      console.log(aadhaar, selectedVaccine, selectedDose);
    }
    else{
      notify("error", "Please fill all the fields!");
    }
  }

  useEffect(() => {
    collapseNavbar();
    const accountType = redirectUser();
    navigate(`/${accountType}`);
    if(accountType){
      fetchVaccines();
    }
    // eslint-disable-next-line
  },[]);
  
  return (
    <MainScreen title="Welcome To AVS!" fluid="md">
      <Container className="my-3" style={{ minHeight: "50vh" }}>
        <Button variant='danger' className="mb-1" size='sm' onClick={resetFields}>Clear</Button>
        <hr />
        <h4>Search The Vaccination Status</h4>
        <Form className="d-flex mt-3 flex-column flex-md-row">
            <Form.Control type="number" placeholder="Enter UIDAI number" name="aadhaar" className='m-1' value={aadhaar} onChange={(e)=>setAadhaar(e.target.value)}/>
            <select className="form-select m-1" name="vaccineName" onChange={(e)=>{handleVaccine(e.target.value)}} value={selectedVaccine} required>
              {vaccines.length === 0 ? (
                <option value={initialBlankValue}>No Vaccine Found</option>
                ) : (
                vaccines.map((vaccine, index) => (
                    <option key={index} value={vaccine.vaccineName}>
                    {vaccine.vaccineName}
                    </option>
                ))
              )}
            </select>
            <select className="form-select m-1" name="vaccineDose" onChange={(e)=>{setSelectedDose(e.target.value)}} value={selectedDose}>
              {
                vaccineDose.length === 1 || vaccineDose.length === 0 ? (
                    <option value="">No vaccine selected</option>
                ) : (
                vaccineDose.map((noOfDose, index) => (
                    <option key={index} value={noOfDose}>
                    {noOfDose}
                    </option>
                )))
              }
            </select>
            <Button className="btn btn-success my-1 mx-auto w-50" onClick={searchVaccinations} disabled={!aadhaar}>{loading && <Spinner size="sm" as="span" className="mx-2"/>}Search</Button>
        </Form>
        <hr />
        {/* {loading && <div className="d-flex align-items-center"><Spinner as="span"/><span className='mx-3'>Fetching Vaccination Status...</span></div>} */}
        <Alert variant='light' className='overflow-auto '>
          <span>Patient Information</span>
          <span className='mx-2 text-info'><FaUser className='mx-2'/>Anand Narsappa Pothraj</span>
          <span className='mx-2 text-danger'>22 Age</span>
          <span className='mx-2 text-warning'>
              {/* {patientGender === "Male" ? <MdMale className='mx-2'/> : <MdFemale className='mx-2'/>}{patientGender} */}
              <MdMale className='mx-2'/> Male
          </span>
        </Alert>
        <Alert variant='light' className='d-flex flex-row align-items-center overflow-auto justify-content-start justify-content-lg-around'>
        <span>
            <Badge bg="primary" >Vaccination Info</Badge>
          </span>
          <span className='mx-2 text-success' >
              <TbVaccine className='mx-2' /> Covaxin
          </span>
          <span className='mx-2 text-primary'>
              <GiOverdose className='mx-2' /> 1
          </span>
          <span>
            <Badge bg="danger" >Partially Vaccinate</Badge>
          </span>
        </Alert>
      </Container>
    </MainScreen>
  )
}

export default InspectorScreen