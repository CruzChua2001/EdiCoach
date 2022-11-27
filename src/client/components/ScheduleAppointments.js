import React from "react";
import { Button, Table } from "react-bootstrap";

export const ScheduleAppointments = () => {
  return (
    <div className="saDiv">
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
          <tr>
            <td>1</td>
            <td>20th December 2022</td>
            <td>12:00pm</td>
            <td>1-on-1</td>
            <td>Nicholas Chan</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="link" className="saLink">
        View All
      </Button>
    </div>
  );
};
