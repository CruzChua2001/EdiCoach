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
        setTimes(response.data.Times);
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
        {times.map((time) => (
          <Button className="calenderTimeButton">{time}</Button>
        ))}
      </div>
    </div>
  );
};
