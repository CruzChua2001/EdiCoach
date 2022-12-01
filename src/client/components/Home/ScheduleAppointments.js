import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const ScheduleAppointments = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://tvf7ofmy9i.execute-api.us-east-1.amazonaws.com/UAT?ClientID=1124`
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
  return (
    <div className="shadow rounded">
      <div className="saTitle">
        <h3>Scheduled Appointments</h3>
      </div>
      <Table className="saTable">
        <thead>
          <tr>
            <th>Session</th>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Coach</th>
          </tr>
        </thead>
        <tbody>
        {loading && <div>A moment please...</div>}
        {error && <div>There is a problem fetching the data</div>}
        {data && (data.Items.map(b => (
          <tr>
            <td>{b.SessionCount.N.toString()} of {b.SessionTotal.N.toString()}</td>
            <td>{new Date(b.StartDateTime.S).toLocaleDateString("en-GB")}</td>
            <td>{new Date(b.StartDateTime.S).toLocaleTimeString("en-US")}</td>
            <td>Type</td>
            <td>Coach</td>
          </tr>
            )))}
        </tbody>
      </Table>
      <Button variant="link" className="saLink">
        View All
      </Button>
    </div>
  );
};
