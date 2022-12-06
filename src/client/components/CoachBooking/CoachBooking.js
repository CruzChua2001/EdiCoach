import React, { useState, useEffect } from "react";
import { Container, Spinner, Button, ToggleButton } from "react-bootstrap";

import { Calendar } from "react-calendar";

import axios from "axios";

function CoachBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState([]);

  const [chosenTime, setChosenTime] = useState();

  useEffect(() => {}, []);

  function updateDate(date) {
    setDate(date);
    const getData = async () => {
      try {
        setLoading(true);
        setTimes([]);
        const response = await axios.get(
          `https://4iqc469vs8.execute-api.us-east-1.amazonaws.com/UAT/availability?CoachID=1123&SelectedDate=${date
            .toISOString()
            .slice(0, 10)}`
        );
        console.log(response.data);
        var timeList = [];
        for (let i = 0; i < response.data.Count; i++) {
          let timeString = `${new Date(
            response.data.Items[i].StartDateTime.S
          ).toLocaleTimeString()} - ${new Date(
            response.data.Items[i].EndDateTime.S
          ).toLocaleTimeString()}`;
          let timeObj = {
            timeString: timeString,
            start: response.data.Items[i].StartDateTime.S,
            end: response.data.Items[i].EndDateTime.S,
          };
          timeList.push(timeObj);
        }
        setTimes(timeList);
        console.log(times);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTimes(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
    console.log(`${date.toISOString()}`);
  }
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
        <div>
          <Calendar onChange={updateDate} value={date} />
          <div style={{ padding: "5px" }}>
            {error && <h4>Encountered error retrieving time slots</h4>}
            {loading && <Spinner className="spinnerLoad" />}
            {times &&
              times.map((time, idx) => (
                <ToggleButton
                  key={idx}
                  value={time.start}
                  checked={chosenTime === time.start}
                  onChange={(e) => setChosenTime(e.currentTarget.value)}
                >
                  {time.timeString}
                </ToggleButton>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CoachBooking;
