import React from "react";

import { Button } from "react-bootstrap";

const Login = () => {

	const Login = () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        fetch("https://1b46sbaptd.execute-api.us-east-1.amazonaws.com/dev/login", {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(message => {
				if (message.status === "success") {
					window.localStorage.setItem("login", true);
					window.localStorage.setItem("usertype", message.usertype);
					switch (message.usertype) {
						case "Admin":
							window.location.href = "/admin/";
							break;

						case "Client":
							window.location.href = "/client/";
							break;

						case "Coach":
							window.location.href = "/coach/";
							break;
					
						default:
							break;
					}
					
				} else {
					document.getElementById("errorMessage").innerText = message.message;
					console.log(message);
				}
            });
            
            
        }).catch(err => console.log(err))
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
		</div>
		</>
		)
}

export default Login