import { Button, Modal, Form, Spinner, Row, Col } from "react-bootstrap";

const AppointmentModal = (props) => {

    const { show, onHide, title, resetFields, loading, vaccines, user, selectedVaccine, handleVaccine, vaccineDose, bookAppointment, selectedDose, setSelectedDose, initialBlankValue, operationType, editAppointment } = props;

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Row>
                <Col sm={6} className="mb-3">
                <Form.Label htmlFor="name" column sm={6}>
                    Full Name
                </Form.Label>
                <Form.Control type="text" name="name" value={user.name} readOnly />
                </Col>
                <Col sm={6} className="mb-3">
                <Form.Label htmlFor="aadhaar" column sm={6}>
                    Aadhaar Number
                </Form.Label>
                <Form.Control
                    type="text"
                    name="aadhaar"
                    value={user.aadhaar}
                    readOnly
                />
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mb-3">
                <Form.Label htmlFor="age" column sm={6}>
                    Age
                </Form.Label>
                <Form.Control type="text" name="age" value={user.age} readOnly />
                </Col>
                <Col sm={6} className="mb-3">
                <Form.Label htmlFor="gender" column sm={6}>
                    Gender
                </Form.Label>
                <Form.Control type="text" name="gender" value={user.gender} readOnly />
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mb-3">
                <Form.Label htmlFor="email" column sm={6}>
                    Email
                </Form.Label>
                <Form.Control type="text" name="email" value={user.email} readOnly />
                </Col>
                <Col sm={6} className="mb-3">
                <Form.Label htmlFor="phone" column sm={6}>
                    Phone
                </Form.Label>
                <Form.Control type="text" name="phone" value={user.phone} readOnly />
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mb-3">
                <Form.Label htmlFor="name" column sm={6}>
                    Select Vaccine
                </Form.Label>
                <select className="form-select" name="vaccineName" onChange={(e)=>{handleVaccine(e.target.value)}} value={selectedVaccine} required>
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
                </Col>
                <Col sm={6} className="mb-3">
                <Form.Label htmlFor="name" column sm={6}>
                    Select Dose
                </Form.Label>
                <select className="form-select" name="vaccineDose" onChange={(e)=>{setSelectedDose(e.target.value)}} value={selectedDose}>
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
                </Col>
            </Row>
            </Form>
            <small>This Appointment is only valid till next 48 hours.</small>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" className="m-2" onClick={operationType === "Edit" ? editAppointment : bookAppointment}>
            {loading && <Spinner size="sm" as="span" className="mx-2"/>}{operationType} Appointment
            </Button>
            <Button className="m-2" variant="warning" onClick={resetFields}>
            Reset Fields
            </Button>
            <Button variant="danger" onClick={onHide}>
            Cancel
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default AppointmentModal;