import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Calendar } from "react-calendar";
import MeetingDetails from "./MeetingDetails";

import { Scheduler } from "@aldabil/react-scheduler";

export default function App() {
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
            <Scheduler
              className={{ root: "mdTable" }}
              editable
              view="week"
              events={[
                {
                  event_id: 1,
                  title: "Event 1",
                  color: "#000000",
                  start: new Date("2022/11/27 09:30"),
                  end: new Date("2022/11/27 10:30"),
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
