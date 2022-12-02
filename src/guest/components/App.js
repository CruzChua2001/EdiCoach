import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "../css/App.css";

import Home from "./Home";
import Careercoaching from "./Careercoaching";
import Contact from "./Contact";
import Login from "./Login";
import CoachLogin from "./CoachLogin";
import Signup from "./Signup";
import OneonOnecoaching from "./OneonOnecoaching";
import NavBar from "./Navbar";
import Personlization from "./Personalization";
import CoachForm from "./CoachForm";
import Footer from "./Footer";

export default function App() {
	return (
		<Router>
			<NavBar />
		
			<Routes>
				<Route path="/guest/home" element={<Home />} />
				<Route path="/guest/career-coaching" element={<Careercoaching />} />
				<Route path="/guest/1-on-1-coaching" element={<OneonOnecoaching />} />
				<Route path="/guest/contact" element={<Contact />} />
				<Route path="/guest/login" element={<Login />} />
				<Route path="/guest/coachlogin" element={<CoachLogin />} />
				<Route path="/guest/sign-up" element={<Signup />} />
				<Route path="/guest/personalization" element={<Personlization />} />
				<Route path="/guest/CoachForm" element={<CoachForm />} />
			</Routes>

			<footer>
				<Footer />
			</footer>

		</Router>
	);
}
