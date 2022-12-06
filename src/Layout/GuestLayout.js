import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../guest/components/Navbar'

import "../guest/css/App.css";
import "../guest/css/NavBar.css";

const GuestLayout = () => {
    return (
        <>
            <Navbar />

            <Outlet />
        </>
    )
}

export default GuestLayout