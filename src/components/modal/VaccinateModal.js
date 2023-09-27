import { TbVaccine } from 'react-icons/tb';
import { Button, Modal, Spinner, Form, Row, Col } from "react-bootstrap";

const VaccinateModal = (props) => {

    const { show, onHide, title, loading, patientAadhaar, patientName, patientAge, patientGender, vaccineDose, vaccineName, vaccinatePatient, doctorName, hospitalName, setHospitalName, pincode, setPincode } = props;

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">{title} <TbVaccine color='red'/></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col sm={6} className="mb-3">
                            <Form.Label htmlFor="name" column sm={6}>Full Name</Form.Label>
                            <Form.Control type="text" name="name" value={patientName} readOnly />
                        </Col>
                        <Col sm={6} className="mb-3">
                            <Form.Label htmlFor="aadhaar" column sm={6}>Aadhaar Number</Form.Label>
                            <Form.Control type="text" name="aadhaar" value={patientAadhaar} readOnly />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} className="mb-3">
                            <Form.Label htmlFor="age" column sm={6}>Age</Form.Label>
                            <Form.Control type="number" name="age" value={patientAge} readOnly />
                        </Col>
                        <Col sm={6} className="mb-3">
                            <Form.Label htmlFor="gender" column sm={6}>Gender</Form.Label>
                            <Form.Control type="text" name="gender" value={patientGender} readOnly />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} className="mb-3">
                            <Form.Label htmlFor="name" column sm={6}>Vaccine</Form.Label>
                            <Form.Control type="text" name="vaccineName" value={vaccineName} readOnly />
                        </Col>
                        <Col sm={6} className="mb-3">
                            <Form.Label htmlFor="name" column sm={6}>Dose</Form.Label>
                            <Form.Control type='number' name="vaccineDose" value={vaccineDose} readOnly />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} className="mb-3">
                            <Form.Label htmlFor="hospitalName" column sm={6}>Hospital</Form.Label>
                            <Form.Control type="text" name="hospitalName" placeholder='Enter hospital name' value={hospitalName} onChange={(e)=>setHospitalName(e.target.value)} autoFocus/>
                        </Col>
                        <Col sm={6} className="mb-3">
                            <Form.Label htmlFor="pincode" column sm={6}>Pincode</Form.Label>
                            <Form.Control type="number" name="pincode" placeholder='Enter Pincode' value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                        </Col>
                    </Row>
                </Form>
                <small>Vaccinating by Dr. {doctorName}</small>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" className="m-2" onClick={vaccinatePatient} disabled={loading}>{loading && <Spinner size="sm" as="span" className="mx-2"/>}Vaccinate</Button>
                <Button variant="danger" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VaccinateModal;