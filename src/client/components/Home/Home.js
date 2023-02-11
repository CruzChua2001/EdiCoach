import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FileEarmark, Person, PencilSquare } from "react-bootstrap-icons";
import { ScheduleAppointments } from "./ScheduleAppointments";

import { AccountContext } from "../../../Account";

export default function ClientHome() {
  const { getSession, getData } = useContext(AccountContext);
  var [sessionData, setSessionData] = useState([]);
  useEffect(() => {
    getData()
      .then((session) => {
        console.log(session);
        setSessionData(session);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Container>
        {sessionData.length > 0 ? (
          <ScheduleAppointments
            accountID={
              sessionData.filter((param) => param.Name == "sub")[0].Value
            }
          />
        ) : (
          ""
        )}

        <br />
        <h2>Shortcuts</h2>
        <br />
        <Row>
          <Col>
            <Button
              variant="secondary"
              className="clientTab shadow"
              href="/client/actionplan"
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
              href="/client/manageAppointments"
              style={{ cursor: "pointer" }}
            >
              <PencilSquare size={"50px"} />
              <h4>Appointment</h4>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
