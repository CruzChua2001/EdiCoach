import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";

import config from "../../../../config";

export default function CoachView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        let url = config.USER_MANAGEMENT_API + `/gettype/Coach`;
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
    getData();
  }, []);

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
            <div className="d-flex">
              {data &&
                data.map((coach) => (
                  <Link to={`/client/coachProfile/${coach.userid.S}`}>
                    <Card style={{ width: "12rem" }} className="rounded">
                      <Card.Img
                        className="coachCardImg"
                        variant="top"
                        src={`https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/images/${coach.userid.S}.png`}
                      />
                      <Card.Body>
                        <Card.Title className="coachCardTitle">
                          {coach.firstname.S + " " + coach.lastname.S}
                        </Card.Title>
                        <Card.Subtitle className="coachCardSubtitle me-2">
                          {coach.skills["L"].map((skills, i) => (
                            <span key={i} className="me-2">{skills["S"]}</span>
                          ))} 
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
