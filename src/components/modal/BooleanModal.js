import { Button, Modal } from 'react-bootstrap';

const BooleanModal = ({ show, onHide, title, item, next }) => {

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">{title} <span className='text-danger'>{item}</span>?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button className="m-2" variant="danger" onClick={next}>Yes</Button>
                <Button variant="success" onClick={onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BooleanModal;