import React from "react";
import { Outlet } from "react-router-dom";
import ClientNavBar from "../client/components/ClientNavBar";

const ClientLayout = () => {
    return (
        <>
            <ClientNavBar />

            <Outlet />
        </>
    )
}

export default ClientLayout