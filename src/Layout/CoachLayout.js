import React from "react";
import { Outlet } from "react-router-dom";
import CoachNavBar from "../coach/components/CoachNavBar";
import CoachFooter from "../coach/components/CoachFooter";

import "../coach/components/css/App.css";
import "../coach/components/css/MeetingScheduler.css";
import "../coach/components/App.css";

import Account, { AccountContext } from "../Account";

const CoachLayout = () => {
  return (
    <>
      <Account>
        <CoachNavBar />

        <Outlet />

        <CoachFooter />
      </Account>
    </>
  );
};

export default CoachLayout;
