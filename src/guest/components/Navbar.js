import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function NavBar() {
    return (
      <>
          <Navbar className="m-3">
            <Container fluid>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavDropdown title="Coaching">
                      <NavDropdown.Item href="/guest/career-coaching">Career Coaching</NavDropdown.Item>
                      <NavDropdown.Item href="/guest/1-on-1-coaching">1-1 Coaching</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/guest/contact">Contact Us</Nav.Link>
                    <a href = "/guest/sign-up">
                        <Button> Get Started </Button>
                    </a>
                  </Nav>
            </Container>
          </Navbar>
      </>
    );
}

export default NavBar