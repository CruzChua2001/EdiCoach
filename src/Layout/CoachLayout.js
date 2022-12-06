import React from "react";
import { Outlet } from "react-router-dom";
import CoachNavBar from '../coach/components/CoachNavBar'

import "../coach/components/css/App.css";
import "../coach/components/css/MeetingScheduler.css";
import "../coach/components/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const CoachLayout = () => {
    return (
        <>
            <CoachNavBar />

            <Outlet />
        </>
    )
}

export default CoachLayout