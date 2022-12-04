import React from "react";
import { Outlet } from "react-router-dom";
import CoachNavBar from '../coach/components/CoachNavBar'

const CoachLayout = () => {
    return (
        <>
            <CoachNavBar />

            <Outlet />
        </>
    )
}

export default CoachLayout