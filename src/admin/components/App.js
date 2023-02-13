import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import "../css/App.css";
import "../css/admin.css";

import Navitem from "./Navitem";

import UserActions from "./UserActions";
import Chat from "./Chat";
import AdminNavBar from "./AdminNavBar";
import SendNotification from "./SendNotification"

import ChatBot from "./ChatBot";

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
			 <AdminNavBar />

			<Routes>
				<Route path="/admin/" element={<UserActions />}/>
				<Route path="/admin/chat" element={<Chat />}/>
				<Route path="/admin/sendnotification" element={<SendNotification />}/>
			</Routes>

			<ChatBot />
		</Router>
	)
}

export default App
