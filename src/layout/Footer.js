import React from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0 ,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="bg-dark text-light w-100">
        <Row>
          <Col className="text-center py-3">Copyright &copy; Anand Vaccination System</Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;