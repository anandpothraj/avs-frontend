import axios from 'axios';
import { TbVaccine } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { notify } from '../../utils/notify';
import { HiDownload } from 'react-icons/hi';
import { GiOverdose } from "react-icons/gi";
import { RiCake2Line } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import server from '../../config/server.json';
import { AiOutlineMail } from "react-icons/ai";
import { FaRegHospital } from 'react-icons/fa';
import { FaStethoscope } from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';
import { BiShieldQuarter } from 'react-icons/bi';
import MainScreen from '../../layout/MainScreen';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { HiOutlineIdentification } from 'react-icons/hi';
import { Badge, Button, ListGroup, Spinner } from 'react-bootstrap';
import { BsGenderAmbiguous, BsCalendar2Date } from "react-icons/bs";

const VaccinationInfo = () => {

    const params = useParams();
    const production = server.url.production;
    const [ loading, setLoading ] = useState(true);
    const [ userInfo, setUserInfo ] = useState(null);
    const [ vaccinationInfo, setVaccinationInfo ] = useState(null);
    const FETCH_VACCINATION_INFO = server.api.patients.FETCH_VACCINATION_INFO;

    function formatDateString(inputDate) {
        const inputDateObject = new Date(inputDate);
        const options = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        };
        return inputDateObject.toLocaleString('en-US', options);
    }

    const fetchVaccinationInfo = async () => {
        const vaccinationId = params.id;
        setLoading(true);
        await axios
        .get(`${production}${FETCH_VACCINATION_INFO}/${vaccinationId}`)
        .then(res => {
            if(res.status === 200){
                if(res){
                    setVaccinationInfo(res.data);
                };
            }
        })
        .catch(err => {
            console.log(err);
            notify("error",err.response.data.message);
        })
        setLoading(false);
    }

    useEffect(() => {
        let userDetails = JSON.parse(localStorage.getItem("user"));
        if(userDetails){
            setUserInfo(userDetails);
            fetchVaccinationInfo();
        }
        // eslint-disable-next-line
    },[])

    return (
        <MainScreen title="Vaccination Info!" fluid="md">
            <div className='d-flex justify-content-between'>
                <Link className='mx-2' to='/patient'>
                <Button variant='outline-info'><IoChevronBack/> Back</Button>
                </Link>
                <Button size='sm' variant='outline-warning'><HiDownload className='mx-2'/>PDF</Button>
            </div>
            <hr />
            {
                loading ? <div className='d-flex align-items-center'><Spinner as="span"/><span className='mx-3'>Fetching Vaccination Information...</span></div> : 
                (userInfo && vaccinationInfo) ? 
                <ListGroup className="d-flex flex-column">
                    <ListGroup.Item><Badge bg="success">Patient Info</Badge></ListGroup.Item>
                    <ListGroup.Item><CgProfile color='red' className='mx-2'/>Name : {userInfo.name}</ListGroup.Item>
                    <ListGroup.Item><HiOutlineIdentification color='green' className='mx-2'/>Aadhaar : {userInfo.aadhaar}</ListGroup.Item>
                    <ListGroup.Item><RiCake2Line color='orange' className='mx-2'/>Age : {userInfo.age}</ListGroup.Item>
                    <ListGroup.Item><AiOutlineMail color='grey' className='mx-2'/>Email : {userInfo.email}</ListGroup.Item>
                    <ListGroup.Item><BsTelephone color='magenta' className='mx-2'/>Phone Number : {userInfo.phone}</ListGroup.Item>
                    <ListGroup.Item><BsGenderAmbiguous color='cyan' className='mx-2'/>Gender : {userInfo.gender}</ListGroup.Item>
                    <ListGroup.Item className='mt-2'><Badge bg="info">Vaccination Info</Badge></ListGroup.Item>
                    <ListGroup.Item><TbVaccine color='red' className='mx-2'/>Vaccine Name : {vaccinationInfo.vaccineName}</ListGroup.Item>
                    <ListGroup.Item><GiOverdose color='green' className='mx-2'/>Vaccine Dose No : {vaccinationInfo.doseNo}</ListGroup.Item>
                    <ListGroup.Item><FaStethoscope color='orange' className="mx-2"/>Vaccinated By : Dr.{vaccinationInfo.doctorName} / {vaccinationInfo.doctorAadhaar}</ListGroup.Item>
                    <ListGroup.Item><FaRegHospital color='grey' className="mx-2"/>Vaccinated At : {vaccinationInfo.hospitalName} / {vaccinationInfo.pincode}</ListGroup.Item>
                    <ListGroup.Item><BsCalendar2Date color='magenta' className="mx-2"/>Vaccinated On : {formatDateString(vaccinationInfo.vaccinatedOn)}</ListGroup.Item>
                    {vaccinationInfo.fullyVaccinated ? 
                    <ListGroup.Item><BiShieldQuarter color='cyan' className="mx-2"/>Vaccination Status : <Badge bg="success" className='mx-2'>Fully Vaccinated</Badge></ListGroup.Item>
                    :
                    <>
                        <ListGroup.Item><BiShieldQuarter color='cyan' className="mx-2"/>Vaccination Status : <Badge bg="success" className='mx-2'>Partially Vaccinated</Badge></ListGroup.Item>
                        <ListGroup.Item><BiShieldQuarter color='cyan' className="mx-2"/>Remaining No of Dose : {vaccinationInfo.remainingNoOfDose}</ListGroup.Item>
                        <ListGroup.Item><BiShieldQuarter color='cyan' className="mx-2"/>Next vaccination after : {vaccinationInfo.nextDose}</ListGroup.Item>
                    </>
                }
                </ListGroup> : 
                <ListGroup className="d-flex flex-column">
                    <ListGroup.Item><Badge bg="success">Unable to find details, Please try again!</Badge></ListGroup.Item>
                </ListGroup>   
            }
        </MainScreen>
    )
}

export default VaccinationInfo;