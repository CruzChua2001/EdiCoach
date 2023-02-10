import React, {useContext} from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";

import { AccountContext } from "../../Account";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const CoachNavBar = () => {
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
        <Navbar.Brand href="#" className="navTitle">
          EDICOACH
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end p-3"
        >
          <Nav className="me-auto">
            <Nav.Link href="/coach/" className="navLink">
              Appointment
            </Nav.Link>
            <Nav.Link href="/coach/client" className="navLink">
              Clients
            </Nav.Link>
            <Nav.Link href="/coach/contact" className="navLink">
              Contact Us
            </Nav.Link>
            <Nav.Link href="/coach/FAQ" className="navLink">
              FAQ
            </Nav.Link>
            <Nav.Link href="/coach/profile" className="navLink">
              Profile
            </Nav.Link>
            <Nav.Link href="#" className="navIcon">
              <Bell size={"1.25em"} />
            </Nav.Link>
            <Nav.Link onClick={Logout} className="navLink">
              Logout
            </Nav.Link>
            <Nav.Link href="#" className="navLink">
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CoachNavBar;
