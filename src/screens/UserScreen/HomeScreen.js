import React, { useEffect } from "react";
import HomeImg from '../../assets/img/HomeBg.png';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row , Col, Button, Image } from "react-bootstrap";

const HomeScreen = () => {

  const navigate = useNavigate();

  // This function takes an json and return true if the json is valid and false if json is invalid
  const isJson = (json) => {
    try {
      JSON.parse(json);
    } catch (e) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    // fetching user from localstorage
    let user = localStorage.getItem("user");
    // if user exist then check the json is valid or not and if user is not exist then redirect to "/"
    if (user && isJson(user)) {
      user = JSON.parse(user);
      let accountType = user.data.accountType.toLowerCase();
      navigate(`/${accountType}`);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="main" fluid="md">
      <Container className="container">
        <Row>
          <Col xs={6} md={4} className="imgCls m-auto">
            <Image src={HomeImg} fluid  />
          </Col>
          <Col xs={12} md={8} className="align-self-center">
            <div className="intro-text">
              <h4 className="title">Welcome To Anand Vaccination System</h4>
              <p className="subtitle">Vaccine Ensured , Life Secured</p>
            </div>
            <div className="buttonContainer">
              <Link to="/">
                <Button size="lg" className="landingbutton btn-success" >
                  Enter AVS
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;