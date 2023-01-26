import React from "react";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { Button } from "react-bootstrap";

const Register = () => {

	const Register = () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let firstname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let dob = document.getElementById("dob").value;

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        let usertype = "Client";
        let uuid = uuidv4();

        fetch("https://1b46sbaptd.execute-api.us-east-1.amazonaws.com/dev/register", {
        method: 'POST',
        body: JSON.stringify({email, password: hash, salt, firstname, lastname, dob, uuid, usertype}),
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(message => {
				if (message.status === "success") {

                    window.location.href = "/admin/login";
					
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
                    <label>Email</label>
					<input type="text" id="email" />
                    <label>Password</label>
					<input type="text" id="password" />
                    <label>First Name</label>
                    <input type="text" id="firstname" />
                    <label>Last Name</label>
					<input type="text" id="lastname" />
                    <label>DOB</label>
                    <input type="text" id="dob" />
					<Button onClick={Register} variant={'primary'}>Submit</Button>
				</form>
				<div id="errorMessage"></div>
			</div>
		</div>
		</>
		)
}

export default Register