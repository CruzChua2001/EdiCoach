import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import UserActions from "./UserActions";
import Login from "./Login";
import Register from "./Register";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/admin/" element={<UserActions />}/>
				<Route path="/admin/login" element={<Login />}/>
				<Route path="/admin/register" element={<Register />}/>
			</Routes>
		</Router>
	)
}

export default App
