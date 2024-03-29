import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./guest/components/Home/Home";
import Careercoaching from "./guest/components/Careercoaching";
import Contact from "./guest/components/Contact";
import Login from "./guest/components/Login";
import CoachLogin from "./guest/components/CoachLogin";
import Signup from "./guest/components/Signup";
import ChooseSignup from "./guest/components/ChooseSignup";
import ContSignup from "./guest/components/ContSignup";
import CodeConfirmation from "./guest/components/CodeConfirmation";
import OneonOnecoaching from "./guest/components/OneonOnecoaching";
import CoachForm from "./guest/components/CoachForm";
import CoachApplication from "./guest/components/CoachApplication";
import Personlization from "./guest/components/Personalization";
import Pending from "./guest/components/Pending";

import ClientHome from "./client/components/Home/Home";
import CoachView from "./client/components/CoachView/CoachView";
import CoachPricing from "./client/components/CoachPricing/CoachPricing";
import CoachProfile from "./client/components/CoachProfile/CoachProfile";
import CoachBooking from "./client/components/CoachBooking/CoachBooking";
import ClientActionPlan from "./client/components/ActionPlan/ActionPlan";
import { ManageAppointments } from "./client/components/ManageAppointments/ManageAppointments";
import ClientVideoStream from "./client/components/ClientVideoStream/ClientVideoStream";
import ClientProfileDetails from "./client/components/Profile/ProfileDetails";
import ClientUpdateProfile from "./client/components/Profile/UpdateProfile";
import ClientContact from "./client/components/Contact/Contact";


import Appointment from "./coach/components/Appointment/Appointment";
import Client from "./coach/components/Client/Client";
import CoachFAQ from "./coach/components/FAQ/FAQ";
import CoachContact from "./coach/components/Contact/Contact";
import ClientDetail from "./coach/components/Client/ClientDetail";
import CreateActionPlan from "./coach/components/ActionPlan/CreateActionPlan";
import ActionPlan from "./coach/components/ActionPlan/ActionPlan";
import CoachVideoStream from "./coach/components/CoachVideoStream/CoachVideoStream";
import ReviewSession from "./coach/components/ReviewSession/ReviewSession";
import CreateCaseNote from "./coach/components/CaseNote/CreateCaseNote";
import CoachProfileDetails from "./coach/components/Profile/ProfileDetails";
import CoachUpdateProfile from "./coach/components/Profile/UpdateProfile";
import CaseNote from "./coach/components/CaseNote/CaseNote";

import UserActions from "./admin/components/UserActions";
import Chat from "./admin/components/Chat";
import Test from "./admin/components/test";
import Notifications from "./admin/components/Notifications";
import SendNotification from "./admin/components/SendNotification";

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
          <Route path="/guest/chooseSignup" element={<ChooseSignup />} />
          <Route path="/guest/contSignup" element={<ContSignup />} />
          <Route path="/guest/sign-up" element={<Signup />} />
          <Route path="/guest/confirmation" element={<CodeConfirmation />} />
          <Route path="/guest/personalization" element={<Personlization />} />
          <Route path="/guest/coachform" element={<CoachForm />} />
          <Route
            path="/guest/coachapplication"
            element={<CoachApplication />}
          />
        </Route>
        <Route path="/guest/pending" element={<Pending />} />

        {/* Client Path */}
        <Route path="/client/" element={<ClientLayout />}>
          <Route path="/client/" element={<ClientHome />} />
          <Route path="/client/coachSelect" element={<CoachView />} />
          <Route path="/client/coachPricing" element={<CoachPricing />} />
          <Route
            path="/client/coachProfile/:coachID"
            element={<CoachProfile />}
          />
          <Route
            path="/client/coachBooking/:id/:coachID"
            element={<CoachBooking />}
          />
          <Route
            path="/client/manageAppointments"
            element={<ManageAppointments />}
          />
          <Route path="/client/actionplan" element={<ClientActionPlan />} />
          <Route path="/client/cvs/:id" element={<ClientVideoStream />} />

          <Route path="/client/profile" element={<ClientProfileDetails />} />
          <Route path="/client/updateprofile" element={<ClientUpdateProfile />} />
          <Route path="/client/chat" element={<Chat />} />
          <Route path="/client/contact" element={<ClientContact />} />
        </Route>

        {/* Coach Path */}
        <Route path="/coach/" element={<CoachLayout />}>
          <Route path="/coach/" element={<Appointment />} />
          <Route path="/coach/client" element={<Client />} />
          <Route path="/coach/contact" element={<CoachContact />} />
          <Route path="/coach/FAQ" element={<CoachFAQ />} />

          <Route path="/coach/client/:id" element={<ClientDetail />} />
          <Route path="/coach/client/actionplan/:id" element={<CreateActionPlan />}/>
          <Route path="/coach/actionplan/:id/:actionplanid" element={<ActionPlan />}/> 
          <Route path="/coach/casenote/create/:id" element={<CreateCaseNote />}/> 
          <Route path="/coach/casenote/view/:id/:casenoteid" element={<CaseNote />}/> 
          <Route path="/coach/cvs/:id" element={<CoachVideoStream />} />
          <Route path="/coach/reviewsession" element={<ReviewSession />} />

          <Route path="/coach/profile" element={<CoachProfileDetails />} />
          <Route path="/coach/updateprofile" element={<CoachUpdateProfile />} />
          <Route path="/coach/chat" element={<Chat />} />
          <Route path="/coach/reviewsession/:id/:bookingid" element={<ReviewSession />} />
        </Route>

        {/* Admin Path */}
        <Route path="/admin/" element={<AdminLayout />}>
          <Route path="/admin/" element={<UserActions />} />
          <Route path="/admin/chat" element={<Chat />} />
          <Route path="/admin/test" element={<Test />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/sendnotification" element={<SendNotification />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
