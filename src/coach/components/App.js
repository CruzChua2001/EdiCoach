import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'

import Appointment from "./Appointment/Appointment";
import Contact from "./Contact/Contact";
import Client from "./Client/Client";
import FAQ from "./FAQ/FAQ";
import ClientDetail from "./Client/ClientDetail";
import ActionPlan from "./ActionPlan/ActionPlan";
import CoachNavBar from "./CoachNavBar";

const App = () => {
	return (
		<Router>
			<CoachNavBar />

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