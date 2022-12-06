import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

import { KeyboardArrowDown, KeyboardArrowUp, Event } from "@mui/icons-material";

import axios from "axios";
import { Link } from "react-router-dom";

function createData(coachName, sessions, price, dateOfPurchase, booking) {
  return {
    coachName,
    sessions,
    price,
    dateOfPurchase,
    booking,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className="appointmentsText">
          {row.coachName}
        </TableCell>
        <TableCell align="right" className="appointmentsText">
          {row.sessions}
        </TableCell>
        <TableCell align="right" className="appointmentsText">
          {row.price}
        </TableCell>
        <TableCell align="right" className="appointmentsText">
          {row.dateOfPurchase}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Bookings
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Session</TableCell>
                    <TableCell align="right">Start Date & Time</TableCell>
                    <TableCell align="right">End Date & Time</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.booking.map((bookingRow) => (
                    <TableRow key={bookingRow.SessionCount}>
                      <TableCell component="th" scope="row">
                        {bookingRow.SessionCount}
                      </TableCell>
                      <TableCell align="right">
                        {bookingRow.StartDateTime}
                      </TableCell>
                      <TableCell align="right">
                        {bookingRow.EndDateTime}
                      </TableCell>
                      <TableCell align="right">{bookingRow.Status}</TableCell>
                      {bookingRow.Status && (
                        <Link
                          to={`/client/coachBooking/${bookingRow.BookingID}`}
                        >
                          <Button
                            variant="link"
                            href="/client/coachBooking/:id"
                          >
                            <Event />
                          </Button>
                        </Link>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const AllCoachSessions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var rows = [];

  var options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://hqyui19u1f.execute-api.us-east-1.amazonaws.com/UAT/payment?ClientID=1123`
        );
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

  console.log(data);
  if (data !== null) {
    for (let i = 0; i < data.Count; i++) {
      let item = data.Items[i];
      let bookings = [];
      for (let j = 0; j < item.Bookings.length; j++) {
        let curr_item = item.Bookings[j];
        let booking = {
          SessionCount: curr_item.SessionCount.N,
          Status: curr_item.Status.BOOL,
          StartDateTime: curr_item.StartDateTime.S,
          EndDateTime: curr_item.EndDateTime.S,
          BookingID: curr_item.BookingID.S,
        };
        bookings.push(booking);
      }
      rows.push(
        createData(
          `${item.CoachID.S}`,
          `${item.Session.N}`,
          `${item.Price.N}`,
          new Date(item.PaymentDateTime.S).toLocaleString("en-US", options),
          bookings
        )
      );
    }
  }
  return (
    <div className="shadow rounded">
      <div className="saTitle">
        <h3>All Coach Sessions</h3>
      </div>
      {loading && <Spinner></Spinner>}
      {error && <div>There is a problem fetching the data</div>}
      {data && (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className="appointmentsHead">Coach Name</TableCell>
                <TableCell align="right" className="appointmentsHead">
                  Sessions
                </TableCell>
                <TableCell align="right" className="appointmentsHead">
                  Price
                </TableCell>
                <TableCell align="right" className="appointmentsHead">
                  Date of Purchase
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.session} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
