import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";
import "../css/NavBar.css";

import { AccountContext } from "../../Account";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const AdminNavBar = () => {

  const { logout } = useContext(AccountContext);

  const Logout = () => {
    logout();
    cookies.remove("accessToken", { path: '/' });
    cookies.remove("userType", { path: '/' });
    window.location.href = "/guest/";
}


  return (
    <Navbar collapseOnSelect expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href="/client/" className="navTitle">
          EDICOACH
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end p-3"
        >
          <Nav className="me-auto">
            <Nav.Link href="/admin/" className="navLink">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="navLink">
              Request
            </Nav.Link>
            <Nav.Link onClick={Logout} className="navLink">
              Logout
            </Nav.Link>
            <Nav.Link href="#" className="navIcon">
              <Bell size={"1.25em"} />
            </Nav.Link>
            <Nav.Link href="#" className="navLink">
              <img
                alt=""
                src="https://st.depositphotos.com/1144472/1532/i/450/depositphotos_15320783-stock-photo-portrait-of-young-woman-at.jpg"
                className="navImg"
              ></img>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavBar;
