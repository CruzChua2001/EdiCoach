import React, { useState, useEffect } from "react";
import { Container, Spinner, Button, ToggleButton } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";

import { Calendar } from "react-calendar";
import axios from "axios";

import config from "../../../../config";

function CoachBooking() {
  const navigate = useNavigate();
  const { id, coachID } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState([]);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    const getBookingData = async () => {
      try {
        let url = config.USER_MANAGEMENT_API + `/get/${coachID}`;
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

  function updateDate(date) {
    setDate(date);
    const getData = async () => {
      try {
        setLoading(true);
        setTimes([]);
        let url = `${
          config.BOOKING_API
        }availability?CoachID=${coachID}&SelectedDate=${date
          .toISOString()
          .slice(0, 10)}`;
        const response = await axios.get(url);
        console.log(url);
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

  function submitBooking() {
    const postData = async () => {
      try {
        var body = {
          BookingID: id,
          StartDateTime: startTime,
          EndDateTime: endTime,
        };
        axios
          .post(`${config.BOOKING_API}booking`, JSON.stringify(body))
          .then((response) => navigate("/client/"));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    postData();
  }

  function handleChosenTime(timeVal) {
    setStartTime(timeVal.start);
    setEndTime(timeVal.end);
  }
  return (
    <Container>
      <div className="shadow rounded ">
        <div className="saTitle">
          <h4>Coach Details</h4>
        </div>
        <Grid container spacing={2}>
          <Grid item>
            <div className="coachBookingDiv">
              <img
                alt=""
                className="coachBookingImg"
                src="https://st.depositphotos.com/1144472/1532/i/450/depositphotos_15320783-stock-photo-portrait-of-young-woman-at.jpg"
              ></img>
            </div>
          </Grid>

          <Grid item>
            <h3 className="coachBookingTitle">
              {data && data[0].firstname.S + " " + data[0].lastname.S}
            </h3>
            <h5 className="coachBookingSubtitle">IT Career Coach</h5>
          </Grid>
        </Grid>
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
                <Button key={idx} onClick={(e) => handleChosenTime(time)}>
                  {time.timeString}
                </Button>
              ))}
          </div>
        </div>
      </div>
      <Button onClick={submitBooking}>Submit</Button>
    </Container>
  );
}

export default CoachBooking;
