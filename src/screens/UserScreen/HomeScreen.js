import React, { useEffect } from "react";
import { isJson } from "../../utils/isJson";
import HomeImg from '../../assets/img/HomeBg.png';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row , Col, Button, Image } from "react-bootstrap";

const HomeScreen = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // fetching user from localstorage
    let user = localStorage.getItem("user");
    // if user exist then check the json is valid or not and if user is not exist then redirect to "/"
    if (user && isJson(user)) {
      user = JSON.parse(user);
      let accountType = user.accountType.toLowerCase();
      navigate(`/${accountType}`);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="main" fluid="md">
      <Container>
        <Row>
          <Col xs={9} md={4} className="m-auto">
            <Image src={HomeImg} fluid />
          </Col>
          <Col xs={12} md={8} className="d-flex">
            <div className="m-auto text-center">
              <div>
                <h4>Welcome To Anand Vaccination System</h4>
                <p>Vaccine Ensured , Life Secured</p>
              </div>
              <div>
                <Link to="/options"><Button size="lg" variant="success" >Enter AVS</Button></Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;