import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import { FileEarmark, Person, PencilSquare } from "react-bootstrap-icons";
import { ScheduleAppointments } from "./ScheduleAppointments";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { redirect } from "react-router-dom";
import ClientNavBar from "../ClientNavBar";

export default function ClientHome() {
  return (
    <div>
      <Container>
        <h2>Welcome back, Lorem Ipsum!</h2>
        <br />
        <ScheduleAppointments />
        <br />
        <h2>Shortcuts</h2>
        <br />
        <Row>
          <Col>
            <Button
              variant="secondary"
              className="clientTab shadow"
              href="/client/"
              style={{ cursor: "pointer" }}
            >
              <FileEarmark size={"50px"} />
              <h4>Action Plan</h4>
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="clientTab shadow"
              href="/client/coachSelect"
              style={{ cursor: "pointer" }}
            >
              <Person size={"50px"} />
              <h4>Find a Coach</h4>
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="clientTab shadow"
              href="/client/"
              style={{ cursor: "pointer" }}
            >
              <PencilSquare size={"50px"} />
              <h4>Manage Appointment</h4>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
