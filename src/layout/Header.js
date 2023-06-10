import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../utils/clearUserData';
import { Container, Nav, Navbar} from "react-bootstrap";
import { collapseNavbar } from '../utils/collapseNavbar';

const Header = () => {

  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const linkCss = "text-decoration-none text-dark m-2";

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want LOGOUT?")) {
      clearUserData();
      navigate('/');
    }
    collapseNavbar();
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
            <Link to="/about" className={linkCss}>About</Link>
            {
              user ?
              <>
                <Link to="/" className={linkCss}>Edit Profile</Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </>
              :
              <>
                <Link to="/login" className={linkCss}>Login</Link>
                <Link to="/register" className={linkCss}>Register</Link>
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