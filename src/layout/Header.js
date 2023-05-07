import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar} from "react-bootstrap";

const Header = () => {

  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const linkCss = "text-decoration-none text-dark m-2";

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want LOGOUT?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate('/');
    }
  };
  
  return(
    <>
      <Navbar collapseOnSelect expand="lg"  className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
        <Navbar.Brand href="/">AVS</Navbar.Brand> 
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
          </Nav>
          <Nav>
            <Link to="/" className={linkCss}>About</Link>
            {
              user ?
              <>
                <Link to="/" className={linkCss}>Edit Profile</Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </>
              :
              <>
                <Link to="/" className={linkCss}>Login</Link>
                <Link to="/" className={linkCss}>Register</Link>
              </>
            }
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;