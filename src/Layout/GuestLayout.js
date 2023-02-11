import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../guest/components/Navbar'

import "../guest/css/App.css";
import "../guest/css/NavBar.css";

import Account, { AccountContext } from "../Account";

const GuestLayout = () => {
    return (
        <>
            <Navbar />
            <Account>
            <Outlet />

            </Account>
        </>
    )
}

export default GuestLayout