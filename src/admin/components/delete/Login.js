import React from "react";
import bcrypt from 'bcryptjs';
import { useCookies } from 'react-cookie';

import { Button } from "react-bootstrap";

const Login = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['name']);

	const Login = () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

		fetch("https://mj1rmiz1mj.execute-api.us-east-1.amazonaws.com/dev/getsalt/"+email, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(salt => {
				if (salt == "Error") {
					document.getElementById("errorMessage").innerText = "Email not found";

				} else {

					let hash = bcrypt.hashSync(password, salt);

					fetch("https://1b46sbaptd.execute-api.us-east-1.amazonaws.com/dev/login", {
						method: 'POST',
						body: JSON.stringify({email, password:hash}),
						headers: { 'Content-Type': 'application/json' }})
						.then((msg) => {
							msg.json()
							.then(message => {
								console.log(message);
								if (message.status === "success") {

									fetch("https://1b46sbaptd.execute-api.us-east-1.amazonaws.com/dev/create", {
										method: 'POST',
										body: JSON.stringify(message.data),
										headers: { 'Content-Type': 'application/json' }})
										.then((msg) => {
											msg.json()
											.then(message => {
												if (message.status === "success") {
													console.log(message);
													setCookie("sessionId", message.userid);

													// window.localStorage.setItem("login", true);
													// window.localStorage.setItem("usertype", message.usertype);
													// switch (message.usertype) {
													// 	case "Admin":
													// 		window.location.href = "/admin/";
													// 		break;
								
													// 	case "Client":
													// 		window.location.href = "/client/";
													// 		break;
								
													// 	case "Coach":
													// 		window.location.href = "/coach/";
													// 		break;
													
													// 	default:
													// 		break;
													// }
													
												} else {
													document.getElementById("errorMessage").innerText = message.message;
													
												}
											});
											
											
										}).catch(err => console.log(err))

								} else {
									document.getElementById("errorMessage").innerText = message.message;
									
								}
							});
							
							
						}).catch(err => console.log(err))

				}

            });
            
            
        }).catch(err => console.log(err))

        
    }

	const Logout = () => {
		removeCookie("sessionId");
	}

    return (
	<>
		<div>Login</div>
		<div>
			<div>
				<form>
					<input type="text" id="email" />
					<input type="text" id="password" />
					<Button onClick={Login} variant={'primary'}>Submit</Button>
				</form>
				<div id="errorMessage"></div>
			</div>
			<div>
			<Button onClick={Logout} variant={'primary'}>Logout</Button>
			</div>
		</div>
		</>
		)
}

export default Login