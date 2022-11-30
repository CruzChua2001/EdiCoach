import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import { FileEarmark, Person, PencilSquare } from "react-bootstrap-icons";
import { ScheduleAppointments } from "./ScheduleAppointments";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { redirect } from "react-router-dom";
import ClientNavBar from "../ClientNavBar";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://9hfdiuacnb.execute-api.us-east-1.amazonaws.com/UAT?email=notweewyekeong@gmail.com`
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  console.log(data);
  return (
    <div>
      <Container>
        {loading && <h2>A moment please...</h2>}
        {error && <h2>There is a problem fetching the data</h2>}
        {data && (
          <h2>
            Welcome back, {data.Items[0].firstName.S} {data.Items[0].lastName.S}
            !
          </h2>
        )}
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
