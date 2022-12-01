import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";

const CoachNavBar = () => {
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
            <Nav.Link href="/coach/appointment" className="navLink">
              Appointment
            </Nav.Link>
            <Nav.Link href="/coach/client" className="navLink">
              Clients
            </Nav.Link>
            <Nav.Link href="/coach/contact" className="navLink">
              Contact Us
            </Nav.Link>
            <Nav.Link href="#" className="navLink">
              FAQ
            </Nav.Link>
            <Nav.Link href="#" className="navIcon">
              <Bell size={"1.25em"} />
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
