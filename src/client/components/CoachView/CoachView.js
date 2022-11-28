import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CoachView() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="shadow rounded">
            <div className="saTitle">
              <h3>Scheduled Appointments</h3>
            </div>
            <div className="p-3">
              <Link to={"/client/"}>
                <Card style={{ width: "12rem" }} className="rounded">
                  <Card.Img
                    className="coachCardImg"
                    variant="top"
                    src="https://st.depositphotos.com/1144472/1532/i/450/depositphotos_15320783-stock-photo-portrait-of-young-woman-at.jpg"
                  />
                  <Card.Body>
                    <Card.Title className="coachCardTitle">
                      Xu En Xin
                    </Card.Title>
                    <Card.Subtitle className="coachCardSubtitle">
                      Addiction Life Coach
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <div className="shadow rounded">
            <div className="saTitle">
              <h3>All Coaches</h3>
            </div>
            <div className="p-3">
              <Link to={"/client/"}>
                <Card style={{ width: "12rem" }} className="rounded">
                  <Card.Img
                    className="coachCardImg"
                    variant="top"
                    src="https://st.depositphotos.com/1144472/1532/i/450/depositphotos_15320783-stock-photo-portrait-of-young-woman-at.jpg"
                  />
                  <Card.Body>
                    <Card.Title className="coachCardTitle">
                      Xu En Xin
                    </Card.Title>
                    <Card.Subtitle className="coachCardSubtitle">
                      Addiction Life Coach
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
