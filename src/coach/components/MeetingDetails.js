import React from "react";
import "./css/App.css";
import { Table, Button } from "react-bootstrap";

const MeetingDetails = () => {
  return (
    <div>
      <h3 className="mdHeader">Meeting Details</h3>
      <Table borderless className="mdTable">
        <tbody>
          <tr>
            <th>Name:</th>
            <td>Josh</td>
          </tr>
          <tr>
            <th>Gender:</th>
            <td>Male</td>
          </tr>
          <tr>
            <th>Age:</th>
            <td>18</td>
          </tr>
          <tr>
            <th>Time:</th>
            <td>13:00 - 15:00</td>
          </tr>
          <tr>
            <th>Remarks:</th>
            <td>I want to learn how to find a job without prior experience</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" className="mdButton">
          LAUNCH MEETING
        </Button>
      </div>
    </div>
  );
};

export default MeetingDetails;
