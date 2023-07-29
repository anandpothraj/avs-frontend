import { Button, Modal, Form, Spinner } from 'react-bootstrap';

const VaccineModal = ({
    minAge,
    timeGap,
    noOfDose,
    addedOn,
    addedBy,
    show,
    setMinAge,
    setTimeGap,
    setNoOfDose,
    vaccineName,
    setVaccineName,
    onHide,
    title,
    resetModal,
    operationType,
    performOperation,
    loading,
}) => {

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor="vaccineName">Enter Vaccine Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Vaccine Name"
                            name="vaccineName"
                            onChange={(e) => setVaccineName(e.target.value)}
                            value={vaccineName}
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label htmlFor="noOfDose">No of Dose</Form.Label>
                        <select className="form-select" 
                            name="noOfDose"
                            type="number"
                            onChange={(e) => {
                                if(e.target.value === "1"){
                                    setTimeGap("");
                                }
                                setNoOfDose(e.target.value)
                             }}
                            value={noOfDose}
                        >
                            <option value={""}>--select--</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </Form.Group>
                    {noOfDose > 1 &&
                        <Form.Group className="mt-2">
                            <Form.Label  htmlFor="timeGap">Time interval between each doses</Form.Label>
                                <select className="form-select"  
                                    name="timeGap" 
                                    type="text"
                                    value={timeGap}
                                    onChange={(e) => setTimeGap(e.target.value)}
                                >
                                    <option value={""}>--select--</option>
                                    <option>30 days</option>
                                    <option>60 days</option>
                                    <option>90 days</option>
                                </select>
                        </Form.Group>
                    }
                    <Form.Group className='mt-2'>
                        <Form.Label htmlFor="minAge" >Minimum age required</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Minimum required"
                            name="minAge"
                            onChange={(e) => setMinAge(e.target.value)}
                            value={minAge}
                        />
                    </Form.Group>
                </Form>
                <small>Vaccine Adding on  - <b>{addedOn?.toLocaleDateString()}</b> by <b>Dr.{addedBy}</b></small>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" className="m-2" onClick={performOperation}>{loading && <Spinner size='sm' as="span" />}{operationType} Vaccine</Button>
                <Button className="m-2" variant="warning" onClick={resetModal}>Reset Feilds</Button>
                <Button variant='danger' onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VaccineModal;