import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";

import Navitem from "./Navitem";

import UserActions from "./UserActions";
import Login from "./Login";
import Register from "./Register";

const TopNav = styled.div`
	z-index: 999;
	display: relative;
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
				<Route path="/admin/" element={<UserActions />}/>
				<Route path="/admin/login" element={<Login />}/>
				<Route path="/admin/register" element={<Register />}/>
			</Routes>
		</Router>
	)
}

export default App
