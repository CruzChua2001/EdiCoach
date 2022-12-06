import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem, FormControl } from "@mui/material";
import { Backspace } from "react-bootstrap-icons";
import axios from "axios";

export default function CoachProfile() {
  const [sessions, setSessions] = useState(12);
  const [cost, setCost] = useState(660);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const priceObject = {
    12: 660,
    16: 800,
    20: 900,
  };

  function submitPayment() {
    const postData = async () => {
      try {
        var body = {
          ClientID: "1123",
          CoachID: "1124",
          Session: sessions,
          Price: priceObject[sessions],
        };
        axios.put('https://hqyui19u1f.execute-api.us-east-1.amazonaws.com/UAT/payment', body)
        .then(response => console.log(response));
        
        setData(response);
        setError(null);
        navigate("/client/coachBooking/");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    postData();
  }

  const handleSessionChange = (event) => {
    let curr_val = event.target.value;
    setSessions(curr_val);
    setCost(priceObject[curr_val]);
    console.log(curr_val);
  };

  return (
    <Container>
      <Button
        variant="primary"
        href="/client/coachSelect"
        className="calenderTimeButton"
      >
        <Backspace /> Back
      </Button>
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
            <Button variant="primary" className="coachProfileButton">
              Message
            </Button>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="coachProfileDiv">
                <Row>
                  <Col>
                    <div style={{ display: "flex" }}>
                      <div>Total: </div>
                      <div className="pricingTag me-2">${cost}</div>
                      <FormControl>
                        <Select
                          defaultValue={12}
                          className="pricingSession"
                          value={sessions}
                          onChange={handleSessionChange}
                        >
                          <MenuItem value={12}>12 Sessions</MenuItem>
                          <MenuItem value={16}>16 Sessions</MenuItem>
                          <MenuItem value={20}>20 Sessions</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Col>
                  <Col className="coachPaymentButtonDiv">
                    <Button
                      variant="success"
                      className="coachPaymentButton"
                      onClick={submitPayment}
                    >
                      Proceed to Payment
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
