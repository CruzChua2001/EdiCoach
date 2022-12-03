import React, { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { DateTimeSelector } from "./DateTimeSelector";

function CoachBooking() {
  return (
    <Container>
      <div className="shadow rounded ">
        <div className="saTitle">
          <h4>Coach Details</h4>
        </div>
        <div>
          <div className="coachBookingDiv">
            <img
              alt=""
              className="coachBookingImg"
              src="https://st.depositphotos.com/1144472/1532/i/450/depositphotos_15320783-stock-photo-portrait-of-young-woman-at.jpg"
            ></img>
          </div>
          <div>
            <h3 className="coachBookingTitle">Nicholas Chan</h3>
            <h5 className="coachBookingSubtitle">IT Career Coach</h5>
          </div>
        </div>
      </div>
      <br />
      <div className="shadow rounded">
        <div className="saTitle">
          <h4>Pick your First Booking Session</h4>
        </div>
        <DateTimeSelector />
      </div>
      <br />
      <div className="shadow rounded">
        <div className="saTitle">
          <h4>Confirm Details</h4>
        </div>
        <br />
        <div></div>
      </div>
    </Container>
  );
}

export default CoachBooking;
