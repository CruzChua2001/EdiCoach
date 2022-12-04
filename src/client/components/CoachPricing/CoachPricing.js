import React, { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";
import { Select, MenuItem } from "@mui/material";

export default function CoachView() {
  const [type, setType] = useState("");
  return (
    <Container>
      <Row>
        <Col>
          <div className="shadow rounded">
            <div className="saTitle">
              <h3>1-on-1 Coaching</h3>
            </div>
            <div className="pricingDiv">
              <p className="pricingText">
                Consult directly 1-on-1 with our professional coach for a
                positive change in your life.
              </p>
              <Table className="pricingTable" borderless>
                <tr>
                  <th>
                    <CheckCircle color="#C1E72D" size={"35px"} />
                  </th>
                  <td>Tackle your unique challenges</td>
                </tr>
                <tr>
                  <th>
                    <CheckCircle color="#C1E72D" size={"35px"} />
                  </th>
                  <td>Dedicate time to understand your emotions</td>
                </tr>
                <tr>
                  <th>
                    <CheckCircle color="#C1E72D" size={"35px"} />
                  </th>
                  <td>Build tailored strategies for personal growth </td>
                </tr>
                <tr>
                  <th>
                    <CheckCircle color="#C1E72D" size={"35px"} />
                  </th>
                  <td>Set goals and see them through to completion</td>
                </tr>
              </Table>
              <div>
                <Row>
                  <Col>
                    <span className="pricingTag">$50</span>
                    <span className="pricingTable"> / session</span>
                  </Col>
                  <Col>
                    <Select
                      defaultValue="12"
                      className="pricingSession"
                      dir="rtl"
                    >
                      <MenuItem value="12">12 Sessions</MenuItem>
                      <MenuItem value="16">16 Sessions</MenuItem>
                      <MenuItem value="20">20 Sessions</MenuItem>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="shadow rounded">
            <div className="saTitle">
              <h3>Career Coaching</h3>
            </div>
            <div className="pricingDiv">
              <p className="pricingText">
                Consult directly 1-on-1 with our professional coach for a
                positive change in your career.
              </p>
              <Table className="pricingTable" borderless>
                <tr>
                  <th>
                    <CheckCircle color="#C1E72D" size={"35px"} />
                  </th>
                  <td>
                    Work directly with a coach to help you reach your career
                    goals.
                  </td>
                </tr>
                <tr>
                  <th>
                    <CheckCircle color="#C1E72D" size={"35px"} />
                  </th>
                  <td>
                    Build and sustain the motivation you need to achieve your
                    goals
                  </td>
                </tr>
                <tr>
                  <th>
                    <CheckCircle color="#C1E72D" size={"35px"} />
                  </th>
                  <td>
                    Sharpen communication skills for better professional
                    relationships
                  </td>
                </tr>
                <tr>
                  <th>
                    <CheckCircle color="#C1E72D" size={"35px"} />
                  </th>
                  <td>Find fulfillment in your work life and beyond</td>
                </tr>
              </Table>
              <div>
                <Row>
                  <Col>
                    <span className="pricingTag">$50</span>
                    <span className="pricingTable"> / session</span>
                  </Col>
                  <Col>
                    <Select
                      defaultValue="12"
                      className="pricingSession"
                      dir="rtl"
                    >
                      <MenuItem value="12">12 Sessions</MenuItem>
                      <MenuItem value="16">16 Sessions</MenuItem>
                      <MenuItem value="20">20 Sessions</MenuItem>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
