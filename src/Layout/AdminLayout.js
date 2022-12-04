import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from '../admin/components/AdminNavBar'

const AdminLayout = () => {
    return (
        <>
            <AdminNavBar />

            <Outlet />
        </>
    )
}

export default AdminLayout