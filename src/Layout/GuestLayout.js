import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../guest/components/Navbar'

const GuestLayout = () => {
    return (
        <>
            <Navbar />

            <Outlet />
        </>
    )
}

export default GuestLayout