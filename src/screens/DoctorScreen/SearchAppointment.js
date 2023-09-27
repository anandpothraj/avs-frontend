import React from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';

const SearchAppointment = ({ setSearchBy, searchBy, searchAppointments, id, loading, setId, resetFields }) => {
  return (
    <Row className='d-flex flex-column flex-lg-row'>
      <Col className='d-flex align-items-center flex-column flex-lg-row w-100 w-lg-50 mx-1'>
        <p className='w-100 my-1'> <Button size='sm' className='mx-2' onClick={resetFields} variant='warning'><GrPowerReset/></Button> SEARCH BY :</p>
        <Form.Select className="w-100 my-1" name="accountType" onChange={(e) => setSearchBy(e.target.value)} value={searchBy} required>
            <option>--select--</option>
            <option>Aadhaar</option>
            <option>Appointment Id</option>
        </Form.Select>
      </Col>
      <Col className='d-flex align-items-center flex-column flex-lg-row w-100 w-lg-50 mx-1'>
        <Form.Control type={searchBy === "Aadhaar" ? "number" : "text"} className="w-100 m-1" placeholder={`Enter ${searchBy === "Aadhaar" ? "Aadhaar" : "Appointment Id"} Number`} value={id} name="aadhaar" onChange={(e) => setId(e.target.value)} autoFocus readOnly={searchBy==="--select--"? true : false} />
        <Button variant='success' className='w-100 mx-1' onClick={searchAppointments} disabled={loading}
>
            {loading && <Spinner size="sm" as="span" className="mx-2" />}
            Search
        </Button>
      </Col>
    </Row>
  );
};

export default SearchAppointment;