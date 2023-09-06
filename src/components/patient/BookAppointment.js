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
        </> 
    );
};

export default BookAppointment;