import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientNavBar from "./ClientNavBar";
import Home from "./Home/Home";
import CoachView from "./CoachView/CoachView";
import CoachPricing from "./CoachPricing/CoachPricing";
import CoachProfile from "./CoachProfile/CoachProfile";

export default function App() {
  return (
    <div>
      <ClientNavBar />
      <Router>
        <Routes>
          <Route path="/client/" element={<Home />} />
          <Route path="/client/coachSelect" element={<CoachView />} />
          <Route path="/client/pricing" element={<CoachPricing />} />
          <Route path="/client/coachProfile" element={<CoachProfile />} />
          <Route path="/client/coachBooking" element={<CoachBooking />} />
        </Routes>
      </Router>
    </div>
  );
}
