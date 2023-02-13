import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import axios from "axios";

import config from "../../../../config";

function createRow(id, session, coachName, start, end) {
  return {
    id,
    session,
    coachName,
    start,
    end,
  };
}

export const ScheduleAppointments = ({ accountID }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState(null);
  const [bookingID, setBookingID] = useState(null);

  var options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const columns = [
    { field: "session", headerName: "Session", width: 100 },
    { field: "coachName", headerName: "Coach Name", width: 220 },
    { field: "start", headerName: "Start Date & Time", width: 220 },
    { field: "end", headerName: "End Date & Time", width: 220 },
  ];

  const handleClick = (event) => {
    console.log(event.row.id);
    setBookingID(event.row.id);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let url = config.BOOKING_API + `booking_clientid/${accountID}`;
        const response = await axios.get(url);
        let r = [];
        response.data.Items.map((booking) => {
          r.push(
            createRow(
              booking.BookingID.S,
              (parseInt(booking.SessionCount.N) + 1).toString(),
              booking.CoachName.S,
              new Date(booking.StartDateTime.S).toLocaleDateString(
                "en-US",
                options
              ),
              new Date(booking.EndDateTime.S).toLocaleDateString(
                "en-US",
                options
              )
            )
          );
        });
        setRows(r);
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <Row>
        <Col className="col-8">
          <h2>Upcoming Appointments</h2>
        </Col>
        <Col className="col-4">
          {bookingID && (
            <Link to={`/client/cvs/${bookingID}`}>
              <Button className="coachProfileButton">Join Call</Button>
            </Link>
          )}
          {!bookingID && (
            <Button className="coachProfileButton" disabled>
              Join Call
            </Button>
          )}
        </Col>
      </Row>
      <div className="shadow rounded">
        {loading && (
          <h3 className="loadingTable">
            Loading <CircularProgress />
          </h3>
        )}
        {error && <div>There is a problem fetching the data</div>}
        {rows && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onRowClick={handleClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};
