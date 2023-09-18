import { Button, Modal, Spinner } from 'react-bootstrap';

const BooleanModal = ({ show, onHide, title, item, next, loading }) => {

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">{title} <span className='text-danger'>{item}</span>?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button className="m-2" variant="danger" onClick={next}>{loading && <Spinner size='sm' className="mx-2" as="span" />}Yes</Button>
                <Button variant="success" onClick={onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BooleanModal;