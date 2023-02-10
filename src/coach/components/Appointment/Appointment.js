import React, { useState, useContext, useEffect } from "react";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Scheduler } from "@aldabil/react-scheduler";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

import { AccountContext } from "../../../Account";
import config from "../../../../config";

import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();
  const { getSession, getData } = useContext(AccountContext);
  var [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    getData()
      .then((session) => {
        setSessionData(session);

        getBookingData(session.filter((param) => param.Name == "sub")[0].Value);
      })
      .catch((err) => console.log(err));
  }, []);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currEvent, setCurrEvent] = useState();

  const [scheduleList, setScheduleList] = useState([]);

  const getBookingData = async (userid) => {
    let url = config.BOOKING_API + `booking_coachid/${userid}`;
    try {
      const response = await axios.get(url);
      setData(response.data);
      let listThing = [];
      response.data.Items.map((booking) => {
        if (booking.StartDateTime.S != "") {
          listThing.push({
            event_id: booking.BookingID.S,
            title: booking.CoachName.S,
            start: new Date(booking.StartDateTime.S),
            end: new Date(booking.EndDateTime.S),
          });
        }
      });
      setScheduleList(listThing);
      console.log(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMeeting = (event) => {
    let url = `${config.BOOKING_API}video_stream`;
    try {
      var body = {
        BookingID: event.event_id,
      };
      axios.post(url, JSON.stringify(body)).then((response) => {
        navigate(`/coach/cvs/${event.event_id}`);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <Container fluid className="m-2 mt-5">
        <Row>
          <Col lg={3}>
            <h3 className="mdHeader">Meeting Details</h3>
            <Table borderless className="mdTable">
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{currEvent ? currEvent.title : "Click on an event"}</td>
                </tr>
                <tr>
                  <th>Time:</th>
                  <td>
                    {currEvent
                      ? currEvent.start.toLocaleTimeString()
                      : "Click on an event"}
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="d-grid gap-2">
              {currEvent && (
                <Button
                  variant="primary"
                  size="lg"
                  className="mdButton"
                  onClick={() => {
                    handleMeeting(currEvent);
                  }}
                >
                  LAUNCH MEETING
                </Button>
              )}
            </div>
          </Col>
          <Col lg={9}>
            {scheduleList.length > 0 && (
              <Scheduler
                view="week"
                editable={false}
                deletable={false}
                events={scheduleList}
                onEventClick={(event) => {
                  setCurrEvent(event);
                }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Appointment;
