import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
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

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import axios from "axios";

function createData(session, coachName, start, end, bookingId) {
  return {
    session,
    coachName,
    start,
    end,
    bookingId,
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
          {row.session}
        </TableCell>
        <TableCell align="right" className="appointmentsText">
          {row.coachName}
        </TableCell>
        <TableCell align="right" className="appointmentsText">
          {row.start}
        </TableCell>
        <TableCell align="right" className="appointmentsText">
          {row.end}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className="appointmentButtons p-2">
                <Button variant="danger">Cancel Booking</Button>
                <Button variant="success">Change Booking Date</Button>
                <Button variant="success">Join Call</Button>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const ScheduleAppointments = () => {
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
          `https://tvf7ofmy9i.execute-api.us-east-1.amazonaws.com/UAT/booking?ClientID=1123`
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
      rows.push(
        createData(
          `${item.SessionCount.N}`,
          "Nicholas Chan",
          new Date(item.StartDateTime.S).toLocaleString("en-US", options),
          new Date(item.EndDateTime.S).toLocaleString("en-US", options)
        )
      );
    }
  }
  return (
    <div className="shadow rounded">
      <div className="saTitle">
        <h3>Upcoming Appointments</h3>
      </div>
      {loading && <div>A moment please...</div>}
      {error && <div>There is a problem fetching the data</div>}
      {data && (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className="appointmentsHead">Session</TableCell>
                <TableCell align="right" className="appointmentsHead">
                  Coach Name
                </TableCell>
                <TableCell align="right" className="appointmentsHead">
                  Start Date & Time
                </TableCell>
                <TableCell align="right" className="appointmentsHead">
                  End Date & Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                (row.start != "Invalid Date") && <Row key={row.session} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
