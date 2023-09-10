import {  Button } from 'react-bootstrap';
import AppointmentModal from '../../components/modal/ApointmentModal';

const BookAppointment = (props) => {

    const {
        user,
        loading,
        vaccines,
        vaccineDose,
        resetFields,
        selectedDose,
        handleVaccine,
        operationType,
        editAppointment,
        selectedVaccine,
        bookAppointment,
        setSelectedDose,
        initialBlankValue,
        setSelectedVaccine,
        openAppointmentModal,
        showAppointmentModal,
        closeAppointmentModal,
    } = props;
  
    return (
        <>
            <Button variant="outline-success" onClick={openAppointmentModal}>Book Appointment</Button>
            <AppointmentModal 
                user={user}
                loading={loading} 
                vaccines={vaccines}
                vaccineDose={vaccineDose}
                resetFields={resetFields} 
                selectedDose={selectedDose}
                show={showAppointmentModal} 
                operationType={operationType}
                handleVaccine={handleVaccine}
                onHide={closeAppointmentModal} 
                editAppointment={editAppointment}
                selectedVaccine={selectedVaccine}
                bookAppointment={bookAppointment}
                setSelectedDose={setSelectedDose}
                initialBlankValue={initialBlankValue}
                title={`${operationType} Appointment`} 
                setSelectedVaccine={setSelectedVaccine}
            />
        </> 
    );
};

export default BookAppointment;