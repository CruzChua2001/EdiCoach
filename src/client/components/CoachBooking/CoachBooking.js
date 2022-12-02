import React, { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import CalendarTemplate from "availability-calendar-react";

function CoachBooking() {
  const [availability, setAvailability] = useState([]);
  const Calendar = CalendarTemplate({
    availability,
    setAvailability,
    primaryColor: "#CCCCCC",
    secondaryColor: "#EEEEEE",
    primaryFontColor: "#444444",
    fontFamily: "Roboto",
    fontSize: 14,
    startTime: "5:00",
    endTime: "22:00",
  });
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <div className="shadow rounded coachBookingDiv">
              <div className="w-25">
                <img
                  alt=""
                  className="coachBookingImg"
                  src="https://st.depositphotos.com/1144472/1532/i/450/depositphotos_15320783-stock-photo-portrait-of-young-woman-at.jpg"
                ></img>
              </div>
              <div className="w-75">
                <h3 className="coachBookingTitle">Nicholas Chan</h3>
                <h5 className="coachBookingSubtitle">IT Career Coach</h5>
              </div>
            </div>
            <br />
            <div className="shadow rounded">
              <div className="saTitle">
                <h4>Pick your First Booking Session</h4>
                <Calendar />
              </div>
            </div>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default CoachBooking;
