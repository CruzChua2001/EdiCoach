import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "../css/App.css";

const TopNav = styled.div`
	z-index: 999;
	display: relative;
	margin-inline: 3%;
	margin-block: 2%
`

const LeftNav = styled.div`
	float: left;
`
    
const RightNav = styled.div`
	text-align: right;
`	

import Home from "./Home";
import Careercoaching from "./Careercoaching";
import Contact from "./Contact";
import Login from "./Login";
import CoachLogin from "./CoachLogin";
import Signup from "./Signup";
import OneonOnecoaching from "./OneonOnecoaching";
import NavBar from "./Navbar";

export default function GuestApp() {
	return (
		<>
			<NavBar />
		
			<Routes>
				<Route path="/guest/home" element={<Home />} />
				<Route path="/guest/career-coaching" element={<Careercoaching />} />
				<Route path="/guest/1-on-1-coaching" element={<OneonOnecoaching />} />
				<Route path="/guest/contact" element={<Contact />} />
				<Route path="/guest/login" element={<Login />} />
				<Route path="/guest/coachlogin" element={<CoachLogin />} />
				<Route path="/guest/sign-up" element={<Signup />} />
			</Routes>
		</>
	);
}
