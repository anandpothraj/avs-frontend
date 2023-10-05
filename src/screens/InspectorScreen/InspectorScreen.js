import axios from 'axios';
import { CgProfile } from 'react-icons/cg';
import { TbVaccine } from 'react-icons/tb';
import { GiOverdose } from 'react-icons/gi';
import { notify } from '../../utils/notify';
import { RiCake2Line } from 'react-icons/ri';
import server from '../../config/server.json';
import { FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MainScreen from '../../layout/MainScreen';
import React, { useEffect, useState } from 'react';
import { redirectUser } from '../../utils/redirectUser';
import { HiOutlineIdentification } from 'react-icons/hi';
import { collapseNavbar } from '../../utils/collapseNavbar';
import { formatDateString } from '../../utils/formatDateString';
import { BsCalendar2Date, BsGenderAmbiguous } from 'react-icons/bs';
import { Badge, Button, Container, Form, Spinner } from 'react-bootstrap';

const InspectorScreen = () => {

  const navigate = useNavigate();
  const initialBlankValue = "--select--";
  const production = server.url.production;
  const [ vaccines, setVaccines ] = useState([{
    vaccineName : initialBlankValue
  }]);
  const [ aadhaar, setAadhaar ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ patientInfo, setPatientInfo ] = useState(null);
  const [ vaccinations, setVaccinations ] = useState([]);
  const FETCH_VACCINES = server.api.doctors.FETCH_VACCINES;
  const [ showPatientInfo, setShowPatientInfo ] = useState(false);
  const [ vaccineDose, setVaccineDose ] = useState([initialBlankValue]);
  const [ selectedDose, setSelectedDose ] = useState(initialBlankValue);
  const [ selectedVaccine, setSelectedVaccine ] = useState(initialBlankValue);
  const FETCH_VACCINATIONS_INFO = server.api.inspectors.FETCH_VACCINATIONS_INFO;

  const generateQuery = (aadhaar, selectedVaccine, selectedDose) => {
    let query = "?";
    query += aadhaar ? `aadhaar=${aadhaar}` : '';
    query += selectedVaccine !== "--select--" ? `&vaccineName=${selectedVaccine}` : '';
    query += selectedDose !== "--select--" ? `&doseNo=${selectedDose}` : '';
    return query;
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
    setLoading(false);
  }

  const resetFields = () => {
    setAadhaar("");
    setVaccinations([]);
    setShowPatientInfo(false);
    setSelectedDose(initialBlankValue);
    setSelectedVaccine(initialBlankValue);
  }

  const fetchVaccinationsInfo = async (query) => {
    setLoading(true);
    await axios
    .get(`${production}${FETCH_VACCINATIONS_INFO}/${query}`)
    .then(res => {
      if(res.status === 200){
        setShowPatientInfo(true);
        setPatientInfo(res.data.patientInfo);
        if(res.data.vaccinations.length > 0 ){
          setVaccinations(res.data.vaccinations);
        }
        else{
          setVaccinations([]);
          notify("error", res.data.message);
        }
        setAadhaar("");
        setSelectedVaccine(initialBlankValue);
        setSelectedDose(initialBlankValue);
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    })
    setLoading(false);
  }

  const searchVaccinations = () => {
    if(aadhaar && aadhaar.length === 12){
      let query = generateQuery(aadhaar, selectedVaccine, selectedDose);
      fetchVaccinationsInfo(query);
    }
    else{
      notify("error", "Invalid Input, Aadhaar should only consist 12 digits!");
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
            <Button className="btn btn-success my-1 mx-auto w-50" onClick={searchVaccinations} disabled={!aadhaar || loading}>{loading && <Spinner size="sm" as="span" className="mx-2"/>}Search</Button>
        </Form>
        <hr />
        {loading ?
        <>
          <div className="d-flex align-items-center"><Spinner as="span"/><span className='mx-3'>Fetching Vaccination Status...</span></div>
          <hr />
        </>
        : 
        <>
          {showPatientInfo && patientInfo && 
            <Container className='overflow-auto bg-light p-2'>
              <Badge bg='success' className='my-2'>Patient Information</Badge>
              <p className='my-1'><CgProfile color='red' className='mx-2'/>Patient Name : {patientInfo.name}</p>
              <p className='my-1'><HiOutlineIdentification color='green' className='mx-2'/>Patient Aadhaar : {patientInfo.aadhaar}</p>
              <p className='my-1'><BsGenderAmbiguous color='cyan' className='mx-2'/>Patient Gender : {patientInfo.gender}</p>
              <p className='my-1'><RiCake2Line color='orange' className='mx-2'/>Patient Age : {patientInfo.age}</p>
            </Container>
          }
          {vaccinations && vaccinations.length > 0 && <Badge bg="info" className='p-2 my-2'>Vaccination Info</Badge>}
          {
            vaccinations && vaccinations.length > 0 ?
            vaccinations.map((vaccination, index) => {
              return (
                <Container className='overflow-auto bg-light p-2 my-2' key={index}>
                <p className='my-1'><FaUserShield color='aqua'  className='mx-2'/>Vaccination Status : {
                  vaccination.fullyVaccinated ? <Badge bg='success' className='mx-2'>Fully Vaccinated</Badge> : <Badge bg='danger' className='mx-2'>Partially Vaccinated</Badge>
                }</p>
                <p className='my-1'><TbVaccine color='lime' className='mx-2'/>Vaccine Name : {vaccination.vaccineName}</p>
                <p className='my-1'><GiOverdose color='fuchsia' className='mx-2'/>Vaccine Dose No : {vaccination.doseNo}</p>
                <p className='my-1'><BsCalendar2Date color='grey' className="mx-2"/>Vaccinated On : {formatDateString(vaccination.updatedAt)}</p>
                </Container>
              )
            }) : null
          }
        </>  
        }
      </Container>
    </MainScreen>
  );
};

export default InspectorScreen;