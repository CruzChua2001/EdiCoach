import React from "react";
import { Outlet } from "react-router-dom";
import GuestNavBar from "../guest/components/GuestNavBar";

import "../guest/css/App.css";
import "../guest/css/NavBar.css";

const GuestLayout = () => {
    return (
        <>
            <GuestNavBar />

            <Outlet />
        </>
    )
}

export default GuestLayout