import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled from "styled-components";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Appointment from "./Appointment";
import Navitem from "./Navitem";

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

			<Button variant={'primary'}>test</Button>

			<Routes>
				<Route path="/coach/" element={<Appointment />}/>
			</Routes>
		</Router>
	)
}

export default App