import QRCode from "react-qr-code";
import { HiDownload } from "react-icons/hi";
import { AiFillHeart } from 'react-icons/ai';
import { FaPrayingHands } from 'react-icons/fa';
import { IoChevronBack } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { downloadPdf } from '../../utils/downloadPdf';
import { formatDateString } from "../../utils/formatDateString";
import { fetchVaccinationInfo } from "../../utils/fetchVaccinationInfo";
import { Container, Row, Col, Badge, Button, Spinner } from 'react-bootstrap';

const CertificateTemplate = (props) => { 

    const params = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ userInfo, setUserInfo ] = useState(null);
    const [ vaccinationId, setVaccinationId ] = useState("");
    const [ vaccinationInfo, setVaccinationInfo ] = useState(null);
    
    const fetchVaccinationInfoDetails = async (payload) => {
        setLoading(true);
        let response = await fetchVaccinationInfo(payload);
        if(response){
            setVaccinationInfo(response);
        }
        setLoading(false);
    }

    const generatePdf = () =>{
        let queryParams = "";
        if(userInfo){
            queryParams += `certificateId=1234567890&patientName=${userInfo.name}&patientAge=${userInfo.age}&patientGender=${userInfo.gender}&patientUserId=${userInfo._id}&patientAadhaar=${userInfo.aadhaar}&patientEmail=${userInfo.email}&patientPhone=${userInfo.phone}`;
        }
        if(vaccinationInfo){
            queryParams += `&vaccineName=${vaccinationInfo.vaccineName}&doseNo=${parseInt(vaccinationInfo.doseNo)}&vaccinatedOn=${vaccinationInfo.vaccinatedOn}&doctorName=${vaccinationInfo.doctorName}&doctorAadhaar=${vaccinationInfo.doctorAadhaar}&hospitalName=${vaccinationInfo.hospitalName}&pincode=${vaccinationInfo.pincode}&fullyVaccinated=${vaccinationInfo.fullyVaccinated}&remainingNoOfDose=${parseInt(vaccinationInfo.remainingNoOfDose)}&nextDose=${vaccinationInfo.nextDose}`
            downloadPdf(queryParams, vaccinationInfo.vaccineName, vaccinationInfo.doseNo);
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
        <Container>
            <div className='d-flex justify-content-between my-2'>
                <Link className='m-2' to={`/patient/${vaccinationId}`}>
                    <Button variant='outline-info'><IoChevronBack/> Back</Button>
                </Link>
                {!loading && <Button size='sm' className='m-2' variant='outline-warning' onClick={generatePdf}>Download PDF<HiDownload className='mx-2'/></Button>}
            </div>
            <hr />
            {loading ? <div className='d-flex align-items-center'><Spinner as="span"/><span className='mx-3'>Fetching PDF...</span></div> :
                <div className="certificate bg-white w-75 mx-auto d-flex py-5">
                    <div className='m-auto w-75'>
                        <div className="certificateHeader">
                            <div>
                                <h2 className='text-center text-success'>AVS</h2>
                                <h6 className='text-center text-black'>Vaccine Ensured, Life Secured!</h6>
                            </div>
                            <div>
                                <h5 style={{fontWeight:"bold"}} className='text-center text-primary'>{vaccinationInfo.remainingNoOfDose? null : "Final "}Certificate for {vaccinationInfo.vaccineName} Vaccination.</h5>
                                <h6 className='text-center text-primary text-bold my-1'>issued by Ministry of health & family welfare.</h6>
                                <h6 style={{fontWeight:"bold"}} className='text-center text-black my-2'>Certificate ID : Fetching...</h6>
                            </div>
                        </div>
                        <hr />
                        <div className="certificateBody m-auto my-3">
                            <h6 className='my-2 text-primary text-decoration-underline'>Patient Details</h6>
                            <Container className='text-black'>
                                <Row>
                                    <Col>Patient Name</Col>
                                    <Col style={{fontWeight:"bold"}}>{userInfo.name}</Col>
                                </Row>
                                <Row>
                                    <Col>Age</Col>
                                    <Col style={{fontWeight:"bold"}}>{userInfo.age}</Col>
                                </Row>
                                <Row>
                                    <Col>Gender</Col>
                                    <Col style={{fontWeight:"bold"}}>{userInfo.gender}</Col>
                                </Row>
                                <Row>
                                    <Col>User Id</Col>
                                    <Col style={{fontWeight:"bold"}}>fetching....</Col>
                                </Row>
                                <Row>
                                    <Col>Patient Aadhaar </Col>
                                    <Col style={{fontWeight:"bold"}}>{userInfo.aadhaar}</Col>
                                </Row>
                                <Row>
                                    <Col>Patient email</Col>
                                    <Col style={{fontWeight:"bold"}}>{userInfo.email}</Col>
                                </Row>
                                <Row>
                                    <Col>Patient phone</Col>
                                    <Col style={{fontWeight:"bold"}}>{userInfo.phone}</Col>
                                </Row>
                            </Container>
                            <hr />
                            <h6 className='my-2 text-primary text-decoration-underline'>Vaccination Details</h6>
                            <Container className='text-black'>
                                <Row>
                                    <Col>Vaccine Name</Col>
                                    <Col style={{fontWeight:"bold"}}>{vaccinationInfo.vaccineName}</Col>
                                </Row>
                                <Row>
                                    <Col>Dose Number</Col>
                                    <Col style={{fontWeight:"bold"}}>{vaccinationInfo.doseNo}/{vaccinationInfo.doseNo + vaccinationInfo.remainingNoOfDose}</Col>
                                </Row>
                                <Row>
                                    <Col>Vaccinated On</Col>
                                    <Col style={{fontWeight:"bold"}}>{formatDateString(vaccinationInfo.vaccinatedOn)}</Col>
                                </Row>
                                <Row>
                                    <Col>Vaccinated By</Col>
                                    <Col style={{fontWeight:"bold"}}> Dr.{vaccinationInfo.doctorName} / {vaccinationInfo.doctorAadhaar}</Col>
                                </Row>
                                <Row>
                                    <Col>Vaccinated At</Col>
                                    <Col style={{fontWeight:"bold"}}>{vaccinationInfo.hospitalName} / {vaccinationInfo.pincode}</Col>
                                </Row>
                                {
                                    vaccinationInfo.fullyVaccinated ? 
                                    <Row>
                                        <Col>Vaccinated Status</Col>
                                        <Col style={{fontWeight:"bold"}}><Badge bg='success'>Fully Vaccinated</Badge></Col>
                                    </Row> : 
                                    <>
                                        <Row>
                                            <Col>Vaccinated Status</Col>
                                            <Col style={{fontWeight:"bold"}}><Badge bg='danger'>Partially Vaccinated</Badge></Col>
                                        </Row>
                                        <Row>
                                            <Col>Remaining Dose Number</Col>
                                            <Col style={{fontWeight:"bold"}}>{vaccinationInfo.remainingNoOfDose}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Next Dose after</Col>
                                            <Col style={{fontWeight:"bold"}}>{vaccinationInfo.nextDose}</Col>
                                        </Row>
                                    </>
                                }
                            </Container>
                        </div>
                        <hr />
                        <Container className='text-black my-4'>
                            <Row>
                                <Col>
                                    <h4 className='text-success'>AVS</h4>
                                    <h6 className='text-black'>Vaccine Ensured, Life Secured!</h6>
                                    <h6 className='text-black'>Thank you for using our service <FaPrayingHands/><AiFillHeart color='red'/></h6>
                                    <small className='text-black'>visit <a target='blank' href='https://anand-vaccination-system.netlify.app/'>@anand-vaccination-system</a> for more info.</small>
                                    <small > <br/></small>
                                    
                                </Col>
                                <Col style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%" }}>
                                    <QRCode
                                        style={{ height: "auto", maxWidth: "100%", width: "100%", margin:"auto" }}
                                        viewBox={`0 0 256 256`}
                                        value={vaccinationInfo && vaccinationInfo.fullyVaccinated ? "Fully Vaccinated" : "Partially Vaccinated"}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            }
        </Container>
    )
}

export default CertificateTemplate;