import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { clearUserData } from '../utils/clearUserData';
import { Container, Nav, Navbar} from "react-bootstrap";
import { collapseNavbar } from '../utils/collapseNavbar';
import BooleanModal from '../components/modal/BooleanModal';

const Header = () => {

  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const [ loading, setLoading ] = useState(false);
  const linkCss = "text-decoration-none text-dark m-2";
  const [ showLogoutModal, setShowLogoutModel ] = useState(false);

  const openLogoutModal = () => {
    setShowLogoutModel(true);
  }

  const closeLogoutModal = () => {
    setShowLogoutModel(false);
    collapseNavbar();
  }

  const logoutHandler = () => {
    setLoading(true);
    clearUserData();
    setLoading(false);
    closeLogoutModal();
    navigate('/');
  };
  
  return(
    <>
      <Navbar collapseOnSelect expand="lg"  className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ToastContainer/>
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
                <Link to="/profile" className={linkCss}>Profile</Link>
                <Nav.Link onClick={openLogoutModal}>Logout</Nav.Link>
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
      <BooleanModal show={showLogoutModal} onHide={closeLogoutModal} title="Logout" next={logoutHandler} loading={loading}/>
    </>
  );
};

export default Header;