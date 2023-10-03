import { GrNotes } from 'react-icons/gr';
import { TbVaccine } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { GiOverdose } from "react-icons/gi";
import { sendPdf } from '../../utils/sendPdf';
import { FaStethoscope } from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';
import { BiShieldQuarter } from 'react-icons/bi';
import MainScreen from '../../layout/MainScreen';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { generatePdf } from '../../utils/generatePdf';
import { AiFillEye, AiOutlineMail } from "react-icons/ai";
import { FaRegHospital, FaUserShield } from 'react-icons/fa';
import { RiCake2Line, RiSendPlaneFill } from "react-icons/ri";
import { formatDateString } from '../../utils/formatDateString';
import { Badge, Button, ListGroup, Spinner } from 'react-bootstrap';
import { BsGenderAmbiguous, BsCalendar2Date } from "react-icons/bs";
import { HiDownload, HiOutlineIdentification } from 'react-icons/hi';
import { BsShieldFillExclamation, BsTelephone } from "react-icons/bs";
import { fetchVaccinationInfo } from '../../utils/fetchVaccinationInfo';

const VaccinationInfo = () => {

    const params = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ userInfo, setUserInfo ] = useState(null);
    const [ vaccinationId, setVaccinationId ] = useState("");
    const [ downloadLoader, setdownLoader ] = useState(false);
    const [ sendPDFLoader, setSendPDFLoader ] = useState(false);
    const [ vaccinationInfo, setVaccinationInfo ] = useState(null);

    const fetchVaccinationInfoDetails = async (payload) => {
        setLoading(true);
        let response = await fetchVaccinationInfo(payload);
        if(response){
            setVaccinationInfo(response);
        }
        setLoading(false);
    }

    const downloadPdf = async () => {
        try {
            setdownLoader(true);
            await generatePdf(userInfo, vaccinationInfo);
        } catch (error) {
            console.error(error);
        } finally {
            setdownLoader(false);
        }
    }

    const sendPdfToEmail = async () => {
        try {
            setSendPDFLoader(true);
            await sendPdf(userInfo, vaccinationInfo);
        } catch (error) {
            console.error(error);
        } finally {
            setSendPDFLoader(false);
        }
    }

    useEffect(() => {
        let userDetails = JSON.parse(localStorage.getItem("user"));
        if(userDetails){
            setUserInfo(userDetails);
            setVaccinationId(params.id);
            fetchVaccinationInfoDetails(params.id);
        }
        // eslint-disable-next-line
    },[])

    return (
        <MainScreen title="Vaccination Info!" fluid="md">
            <div className='d-flex'>
                <div className='w-25'>
                    <Link className='mx-2' to='/patient'>
                        <Button size='sm' variant='outline-info'><IoChevronBack/> Back</Button>
                    </Link>
                </div>
                <div className='w-75 d-flex justify-content-end align-items-center'>
                    <Button size='sm' variant='outline-primary' disabled={sendPDFLoader} onClick={sendPdfToEmail}>{sendPDFLoader && <Spinner size="sm" as="span" className="mx-2"/>}<RiSendPlaneFill className='mx-2'/>PDF Email<AiOutlineMail className='mx-2'/></Button>
                    {(!loading && userInfo && vaccinationInfo) && <Button className='mx-2 d-md-none' disabled={downloadLoader} onClick={downloadPdf} size='sm' variant='outline-warning'>{downloadLoader && <Spinner size="sm" as="span" className="mx-2"/>}Download PDF<HiDownload className='mx-2'/></Button>}
                    <Link className='mx-2 d-none d-md-block' to={`/certificate/${vaccinationId}`}>
                        <Button size='sm' variant='outline-warning'><AiFillEye className='mx-2'/>Preview & download PDF<HiDownload className='mx-2'/></Button>
                    </Link> 
                </div>
            </div>
            <hr />
            {
                loading ? <div className='d-flex align-items-center'><Spinner as="span"/><span className='mx-3'>Fetching Vaccination Information...</span></div> : 
                (userInfo && vaccinationInfo) ? 
                <ListGroup className="d-flex flex-column certificate">
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
                    <ListGroup.Item><GrNotes color='white' className='mx-2'/>Certificate Id : {vaccinationInfo.certificateId}</ListGroup.Item>
                    <ListGroup.Item><FaStethoscope color='orange' className="mx-2"/>Vaccinated By : Dr.{vaccinationInfo.doctorName} / {vaccinationInfo.doctorAadhaar}</ListGroup.Item>
                    <ListGroup.Item><FaRegHospital color='grey' className="mx-2"/>Vaccinated At : {vaccinationInfo.hospitalName} / {vaccinationInfo.pincode}</ListGroup.Item>
                    <ListGroup.Item><BsCalendar2Date color='magenta' className="mx-2"/>Vaccinated On : {formatDateString(vaccinationInfo.vaccinatedOn)}</ListGroup.Item>
                    {vaccinationInfo.fullyVaccinated ? 
                    <ListGroup.Item><FaUserShield color='cyan'  className='mx-1'/>Vaccination Status : <Badge bg="success" className='mx-2'>Fully Vaccinated</Badge></ListGroup.Item>
                    :
                    <>
                        <ListGroup.Item><BsShieldFillExclamation color='red' className='mx-2'/>Vaccination Status : <Badge bg="danger" className='mx-2'>Partially Vaccinated</Badge></ListGroup.Item>
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