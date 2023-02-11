import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CoachView() {

  const [coaches, setCoaches] = useState([])

  useEffect(() => {
    let url = "https://wv704kalt9.execute-api.ap-southeast-1.amazonaws.com/UAT/recommendations"

    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`)
        }
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("Oops, we haven't got JSON!")
        }
        return response.json()
    })
    .then((result) => {
      setCoaches(result)
      console.log(result)
    })
    .catch((error) => {
        console.log("Error: " + error);
    })
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <div className="shadow rounded">
            <div className="saTitle">
              <h3>Recommendations</h3>
            </div>
            <div className="d-flex">
              { coaches.map((item, index) => (
                <Link key={index} className="text-dark ">
                  <div className="p-3">
                    <Link to={"/client/coachProfile"}>
                      <Card style={{ width: "12rem" }} className="rounded">
                        <Card.Img
                          className="coachCardImg"
                          variant="top"
                          src="https://st.depositphotos.com/1144472/1532/i/450/depositphotos_15320783-stock-photo-portrait-of-young-woman-at.jpg"/>
                        <Card.Body>
                          <Card.Title className="coachCardTitle">
                            {item["firstname"]["S"]} {item["lastname"]["S"]}
                          </Card.Title>
                          <Card.Subtitle className="coachCardSubtitle text-center">
                          {item["skills"]["L"].map((skills, i) => (
                            <span key={i} className="me-2">{skills["S"]}</span>
                          ))}
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                </Link>
            ))}
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
              <Link to={"/client/coachProfile"}>
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
