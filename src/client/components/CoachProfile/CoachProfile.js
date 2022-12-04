import React, { useState } from "react";
import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";

export default function CoachProfile() {
  return (
    <Container>
      <Button>Back</Button>
      <Row>
        <Col lg={4}>
          <div className="shadow rounded coachProfileDiv">
            <img
              alt=""
              className="coachProfileImg"
              src="https://st.depositphotos.com/1144472/1532/i/450/depositphotos_15320783-stock-photo-portrait-of-young-woman-at.jpg"
            ></img>
            <br />
            <h3 className="coachProfileTitle">Nicholas Chan</h3>
            <h5 className="coachProfileSubtitle">IT Career Coach</h5>
            <p className="coachProfileText">
              Hello, my name is Nicholas! I am a career coach that specializes
              in IT. Have any questions regarding the in’s and out’s of the IT
              industry? I’m your guy
            </p>
          </div>
        </Col>
        <Col lg={8}>
          <Row>
            <Col>
              <div className="shadow rounded coachProfileDiv">
                <Table className="coachProfileTable">
                  <tr>
                    <th>Full Name</th>
                    <td>John Doe</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>johndoe@gmail.com</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>+65 9999 9999</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>123 Yishun Street #01-231</td>
                  </tr>
                </Table>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="shadow rounded coachProfileDiv">
                <Row>
                  <Col lg={2}>
                    <h6 className="coachProfileTagTitle">Tags</h6>
                  </Col>
                  <Col lg={10}>
                    <Badge pill className="coachProfileTagPill">
                      Career Coach
                    </Badge>
                    <Badge pill className="coachProfileTagPill">
                      Information Technology
                    </Badge>
                    <Badge pill className="coachProfileTagPill">
                      Artificial Intelligence
                    </Badge>
                    <Badge pill className="coachProfileTagPill">
                      Cyber Security
                    </Badge>
                    <Badge pill className="coachProfileTagPill">
                      Information Systems
                    </Badge>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col>
                  <div className="coachProfileDiv">
                    <Button variant="primary" className="coachProfileButton">
                      Message
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="coachProfileDiv">
                    <Button
                      href="/client/coachBooking"
                      variant="success"
                      className="coachProfileButton"
                    >
                      Book Coach
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
