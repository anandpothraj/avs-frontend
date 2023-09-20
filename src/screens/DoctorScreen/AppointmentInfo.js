import React from 'react';
import { FaUser } from 'react-icons/fa';
import { TbVaccine } from 'react-icons/tb';
import { GiOverdose } from 'react-icons/gi';
import { Alert, Button } from 'react-bootstrap';
import { MdMale, MdFemale } from 'react-icons/md';

const AppointmentInfo = ({appointments, patientName, patientAge, patientGender, openVaccinateModal }) => {
    return (
        <>
            {
                appointments && appointments.length > 0 ? appointments.map((appointment, index) => {
                    return (
                    appointment.status === "active" &&
                        <Alert key={index} variant='light' className='d-flex flex-row align-items-center overflow-auto justify-content-start justify-content-lg-around'>
                            <span className='mx-2 text-info'>
                                <FaUser className='mx-2'/>{patientName}
                            </span>
                            <span className='mx-2 text-danger'>
                                {patientAge} Age
                            </span>
                            <span className='mx-2 text-warning'>
                                {patientGender === "Male" ? <MdMale className='mx-2'/> : <MdFemale className='mx-2'/>}{patientGender}
                            </span>
                            <span className='mx-2 text-success' >
                                <TbVaccine className='mx-2' />{appointment.vaccineName}
                            </span>
                            <span className='mx-2 text-primary'>
                                <GiOverdose className='mx-2' />{appointment.doseNo}
                            </span>
                            <span className='mx-2'>
                                <Button size='sm' variant='success' onClick={()=>openVaccinateModal(appointment.vaccineName, appointment.doseNo, appointment.maxDose, appointment.appointmentId, appointment.nextDose)}>Vaccinate</Button>
                            </span>
                        </Alert>
                    ) 
                }) : null
            }
        </>
    );
};

export default AppointmentInfo;