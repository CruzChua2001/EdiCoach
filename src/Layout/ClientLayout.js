import React from "react";
import { Outlet } from "react-router-dom";
import ClientNavBar from "../client/components/ClientNavBar";

import "../client/css/App.css";
import ClientFooter from "../client/components/ClientFooter";

import Account, { AccountContext } from "../Account";

const ClientLayout = () => {
  return (
    <>
      <Account>
        <ClientNavBar />

        <Outlet />

        <ClientFooter />
      </Account>
    </>
  );
};

export default ClientLayout;
