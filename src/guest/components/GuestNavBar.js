import React from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";
import "../css/NavBar.css";

const GuestNavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="mb-5">
      <Container className="">
        <Navbar.Brand href="/client/" className="navTitle">
          EDICOACH
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="p-3"
        >
          <Nav className="me-auto">
            <NavDropdown
              title="Coaching"
              id="collasible-nav-dropdown"
              className="navLink"
            >
              <NavDropdown.Item href="#">Career Coaching</NavDropdown.Item>
              <NavDropdown.Item href="#">1-on-1 Coaching</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" className="navLink">
              Contact Us
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
            <Nav.Link href="/guest/sign-up/" className="navLink">
              <Button> Get Started </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GuestNavBar;
