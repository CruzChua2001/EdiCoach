import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Calendar } from "react-calendar";

import axios from "axios";

export const DateTimeSelector = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState([]);

  useEffect(() => {}, []);

  function updateDate(date) {
    setDate(date);
    const getData = async () => {
      try {
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
          timeList.push(timeString);
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
    <div>
      <Calendar onChange={updateDate} value={date} />
      <br />
      <div>
        {times &&
          times.map((time) => (
            <Button className="calenderTimeButton">{time}</Button>
          ))}
      </div>
    </div>
  );
};
