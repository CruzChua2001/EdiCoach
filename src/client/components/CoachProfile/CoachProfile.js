import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem, FormControl } from "@mui/material";
import { Backspace } from "react-bootstrap-icons";
import axios from "axios";

import { AccountContext } from "../../../Account";

import config from "../../../../config";

export default function CoachProfile() {
  const { coachID } = useParams();

  const { getSession, getData } = useContext(AccountContext);

  const [sessions, setSessions] = useState(12);
  const [cost, setCost] = useState(660);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    getData()
      .then((session) => {
        console.log(session);
        setSessionData(session);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const getBookingData = async () => {
      try {
        let url = config.USER_MANAGEMENT_API + `/get/${coachID}`;
        console.log(url);
        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getBookingData();
  }, []);

  console.log(coachID);

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
          ClientID: sessionData.filter((param) => param.Name == "sub")[0].Value,
          CoachID: coachID,
          CoachName: data[0].firstname.S + " " + data[0].lastname.S,
          Session: sessions,
          Price: priceObject[sessions],
        };
        axios
          .put(config.BOOKING_API + "payment", JSON.stringify(body))
          .then((response) => navigate("/client/"));
      } catch (err) {
        console.log(err);
      } finally {
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
            <h3 className="coachProfileTitle">
              {data && data[0].firstname.S + " " + data[0].lastname.S}
            </h3>
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
                    <td>
                      {data && data[0].firstname.S + " " + data[0].lastname.S}
                    </td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{data && data[0].email.S}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>+65 {data && data[0].phone.S}</td>
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
