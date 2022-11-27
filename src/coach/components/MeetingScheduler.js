import React from "react";
import "./css/MeetingScheduler.css";
import { Table, Button, ThemeProvider } from "react-bootstrap";

import { Scheduler } from "@aldabil/react-scheduler";

const MeetingScheduler = () => {
  return (
    <div>
      <Scheduler
        editable
        view="week"
        events={[
          {
            event_id: 1,
            title: "Event 1",
            color: "#000000",
            start: new Date("2022/11/27 09:30"),
            end: new Date("2022/11/27 10:30"),
          },
        ]}
      />
    </div>
  );
};

export default MeetingScheduler;
