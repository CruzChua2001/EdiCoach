import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./guest/components/Home";
import Careercoaching from "./guest/components/Home";
import Contact from "./guest/components/Contact";
import Login from "./guest/components/Login";
import CoachLogin from "./guest/components/CoachLogin";
import Signup from "./guest/components/Signup";
import OneonOnecoaching from "./guest/components/OneonOnecoaching";

import ClientHome from "./client/components/Home/Home";
import CoachView from "./client/components/CoachView/CoachView";
import CoachPricing from "./client/components/CoachPricing/CoachPricing";
import CoachProfile from "./client/components/CoachProfile/CoachProfile";
import CoachBooking from "./client/components/CoachBooking/CoachBooking";

import Appointment from "./coach/components/Appointment/Appointment";
import Client from "./coach/components/Client/Client";
import CoachFAQ from "./coach/components/FAQ/FAQ";
import CoachContact from "./coach/components/Contact/Contact";
import ClientDetail from "./coach/components/Client/ClientDetail";
import ActionPlan from "./coach/components/ActionPlan/ActionPlan";

import UserActions from "./admin/components/UserActions";
import Chat from "./admin/components/Chat";

import GuestLayout from "./Layout/GuestLayout";
import ClientLayout from "./Layout/ClientLayout";
import CoachLayout from "./Layout/CoachLayout";
import AdminLayout from "./Layout/AdminLayout";

import "./guest/css/App.css";
import "./guest/css/NavBar.css";
import "./coach/components/css/App.css";
import "./coach/components/css/MeetingScheduler.css";
import "./coach/components/App.css";
import "./admin/css/admin.css";
import "./client/css/App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Guest Path */}
        <Route path="/guest/" element={<GuestLayout />}>
          <Route path="/guest/" element={<Home />} />
          <Route path="/guest/career-coaching" element={<Careercoaching />} />
          <Route path="/guest/1-on-1-coaching" element={<OneonOnecoaching />} />
          <Route path="/guest/contact" element={<Contact />} />
          <Route path="/guest/login" element={<Login />} />
          <Route path="/guest/coachlogin" element={<CoachLogin />} />
          <Route path="/guest/sign-up" element={<Signup />} />
        </Route>

        {/* Client Path */}
        <Route path="/client/" element={<ClientLayout />}>
          <Route path="/client/" element={<ClientHome />} />
          <Route path="/client/coachSelect" element={<CoachView />} />
          <Route path="/client/coachPricing" element={<CoachPricing />} />
          <Route path="/client/coachProfile" element={<CoachProfile />} />
          <Route path="/client/coachBooking" element={<CoachBooking />} />
        </Route>

        {/* Coach Path */}
        <Route path="/coach/" element={<CoachLayout />}>
          <Route path="/coach/" element={<Appointment />} />
          <Route path="/coach/client" element={<Client />} />
          <Route path="/coach/contact" element={<CoachContact />} />
          <Route path="/coach/FAQ" element={<CoachFAQ />} />

          <Route path="/coach/client/:id" element={<ClientDetail />} />
          <Route path="/coach/client/actionplan/:id" element={<ActionPlan />} />
        </Route>

        {/* Admin Path */}
        <Route path="/admin/" element={<AdminLayout />}>
          <Route path="/admin/" element={<UserActions />} />
          <Route path="/admin/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
