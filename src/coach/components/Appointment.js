import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Calendar } from "react-calendar";

import MeetingDetails from "./MeetingDetails";
import MeetingScheduler from "./MeetingScheduler";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

const Appointment = () => {
  return (
    <div>
      <Container fluid className="m-2 mt-5">
        <Row>
          <Col lg={3}>
            <h2>
              <Calendar
                formatMonthYear={(locale, date) =>
                  date.toLocaleString(locale, {
                    month: "short",
                    year: "numeric",
                  })
                }
              />
            </h2>
            <br />
            <MeetingDetails />
          </Col>
          <Col lg={9}>
            <MeetingScheduler />
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Appointment;
