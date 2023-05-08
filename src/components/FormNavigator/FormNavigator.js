import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Step } from '../../Context/Context';
import { Col, Row, Button } from 'react-bootstrap';

const LoginFormNavigator = (props) => {

  const { step } = useContext(Step);

  return (
    <>
    <Row>
        {step > 1 ?
        <Col>
            <Button className="m-1" variant="warning">Previous</Button>
        </Col> : null
        }
        <Col>
            <Button className="m-1" variant="danger">Reset</Button>
        </Col>
        <Col>
            <Button className="m-1" variant="success">Continue</Button>
        </Col>
    </Row>    
    {step === 1 && props.FormType === "Login" ? <p className="mt-2">New to website <Link to="/">Register.</Link></p> : null}
    </>
  )
}

export default LoginFormNavigator;