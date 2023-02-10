import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import axios from "axios";

import config from "../../../../config";

export const AllCoachSessions = ({ paymentID }) => {
  console.log(paymentID);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
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
    { field: "coachName", headerName: "Coach Name", width: 150 },
    { field: "session", headerName: "Session", width: 100 },
    { field: "sdt", headerName: "Start Date & Time", width: 220 },
    { field: "edt", headerName: "End Date & Time", width: 220 },
  ];

  function createRow(id, session, coachName, sdt, edt, coachID) {
    return {
      id,
      session,
      coachName,
      sdt,
      edt,
      coachID,
    };
  }

  const getPaymentData = async () => {
    let url = `${config.BOOKING_API}booking_paymentid/${paymentID}`;
    console.log(url);
    try {
      const response = await axios.get(url);
      console.log("Data", response.data);
      let d = [];
      response.data.Items.map((booking) => {
        d.push(
          createRow(
            booking.BookingID.S,
            booking.SessionCount.N,
            booking.CoachName.S,
            booking.StartDateTime.S != ""
              ? new Date(booking.StartDateTime.S).toLocaleDateString(
                  "en-US",
                  options
                )
              : "Date not Set",
            booking.EndDateTime.S != ""
              ? new Date(booking.EndDateTime.S).toLocaleDateString(
                  "en-US",
                  options
                )
              : "Date not Set",
            booking.CoachID.S
          )
        );
      });

      setData(d);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPaymentData(paymentID);
  }, [paymentID]);

  function handleClick(event) {
    console.log(event.row);
    if (event.row.sdt == "Date not Set") {
      setBookingID({ id: event.row.id, coachID: event.row.coachID });
    } else {
      setBookingID(null);
    }
  }

  return (
    <div>
      <div className="shadow rounded">
        {loading && (
          <h3 className="loadingTable">
            Loading <CircularProgress />
          </h3>
        )}
        {error && <div>There is a problem fetching the data</div>}
        {paymentID && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onRowClick={handleClick}
            />
          </div>
        )}
      </div>
      <br />
      {bookingID && (
        <Link to={`/client/CoachBooking/${bookingID.id}/${bookingID.coachID}`}>
          <Button className="float-end">Set Date</Button>
        </Link>
      )}
    </div>
  );
};
