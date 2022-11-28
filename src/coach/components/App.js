import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

import Appointment from "./Appointment/Appointment";
import Navitem from "./Navitem";
import Contact from "./Contact/Contact";
import Client from "./Client/Client";
import FAQ from "./FAQ/FAQ";
import ClientDetail from "./Client/ClientDetail";
import ActionPlan from "./ActionPlan/ActionPlan";

const TopNav = styled.div`
	z-index: 999;
	display: relative;
	margin-inline: 3%;
	margin-block: 2%;
`

const LeftNav = styled.div`
	float: left;
`

const RightNav = styled.div`
	text-align: right;
`

const App = () => {
	return (
		<Router>
			<TopNav>
				<LeftNav></LeftNav>
				<RightNav>
					<Navitem />
				</RightNav>
			</TopNav>

			<Routes>
				<Route path="/coach/appointment" element={<Appointment />}/>
				<Route path="/coach/client" element={<Client />}/>
				<Route path="/coach/contact" element={<Contact />}/>
				<Route path="/coach/FAQ" element={<FAQ />}/>

				<Route path="/coach/client/:id" element={<ClientDetail />} />
				<Route path="/coach/client/actionplan/:id" element={<ActionPlan />} />
			</Routes>
		</Router>
	)
}

export default App