import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../admin/components/AdminNavBar";
import ChatBot from "../admin/components/ChatBot";

import "../admin/css/admin.css";
import AdminFooter from "../admin/components/AdminFooter";

import Account, { AccountContext } from "../Account";

const AdminLayout = () => {
  return (
    <>
      <Account>
        <AdminNavBar />

        <Outlet />

        <AdminFooter />
      </Account>

      {/* <ChatBot /> */}
    </>
  );
};

export default AdminLayout;
