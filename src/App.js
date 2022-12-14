import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./guest/components/Home";
import Careercoaching from "./guest/components/Home";
import Contact from "./guest/components/Contact";
import Login from "./guest/components/Login";
import CoachLogin from "./guest/components/CoachLogin";
import Signup from "./guest/components/Signup";
import OneonOnecoaching from "./guest/components/OneonOnecoaching";
import CoachForm from "./guest/components/CoachForm";
import CoachApplication from "./guest/components/CoachApplication";
import Personlization from "./guest/components/Personalization";

import ClientHome from "./client/components/Home/Home";
import CoachView from "./client/components/CoachView/CoachView";
import CoachPricing from "./client/components/CoachPricing/CoachPricing";
import CoachProfile from "./client/components/CoachProfile/CoachProfile";
import CoachBooking from "./client/components/CoachBooking/CoachBooking";
import ClientActionPlan from "./client/components/ActionPlan/ActionPlan";
import { ManageAppointments } from "./client/components/ManageAppointments/ManageAppointments";

import Appointment from "./coach/components/Appointment/Appointment";
import Client from "./coach/components/Client/Client";
import CoachFAQ from "./coach/components/FAQ/FAQ";
import CoachContact from "./coach/components/Contact/Contact";
import ClientDetail from "./coach/components/Client/ClientDetail";
import CreateActionPlan from "./coach/components/ActionPlan/CreateActionPlan";

import UserActions from "./admin/components/UserActions";
import Chat from "./admin/components/Chat";

import GuestLayout from "./Layout/GuestLayout";
import ClientLayout from "./Layout/ClientLayout";
import CoachLayout from "./Layout/CoachLayout";
import AdminLayout from "./Layout/AdminLayout";

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
          <Route path="/guest/personalization" element={<Personlization />} />
          <Route path="/guest/coachform" element={<CoachForm />} />
          <Route path="/guest/coachapplication" element={<CoachApplication />} />
        </Route>

        {/* Client Path */}
        <Route path="/client/" element={<ClientLayout />}>
          <Route path="/client/" element={<ClientHome />} />
          <Route path="/client/coachSelect" element={<CoachView />} />
          <Route path="/client/coachPricing" element={<CoachPricing />} />
          <Route path="/client/coachProfile" element={<CoachProfile />} />
          <Route path="/client/coachBooking/:id" element={<CoachBooking />} />
          <Route
            path="/client/manageAppointments"
            element={<ManageAppointments />}
          />
          <Route path="/client/actionplan" element={<ClientActionPlan />} />
        </Route>

        {/* Coach Path */}
        <Route path="/coach/" element={<CoachLayout />}>
          <Route path="/coach/" element={<Appointment />} />
          <Route path="/coach/client" element={<Client />} />
          <Route path="/coach/contact" element={<CoachContact />} />
          <Route path="/coach/FAQ" element={<CoachFAQ />} />

          <Route path="/coach/client/:id" element={<ClientDetail />} />
          <Route path="/coach/client/actionplan/:id" element={<CreateActionPlan />} />
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
