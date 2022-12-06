import React from "react";
import {Form, Button} from 'react-bootstrap';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import config from '../../../config';

const Signup = () => {

const FormStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '125vh',
    marginTop: '25px',

};

const Register = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let dob = document.getElementById("dob").value;
    let phone = document.getElementById("phone").value;;
    let gender = document.getElementById("gender").value;;
    
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let usertype = "Client";
    let userid = uuidv4();

    fetch(config.SESSION_API+"/register", {
    method: 'POST',
    body: JSON.stringify({email, password: hash, salt, firstname, lastname, dob, phone, gender, userid, usertype}),
    headers: { 'Content-Type': 'application/json' }})
    .then((msg) => {
        msg.json()
        .then(message => {
            if (message.status === "success") {

                window.location.href = "/guest/login";
                
            } else {
                document.getElementById("errorMessage").innerText = message.message;
                console.log(message);
            }
        });
        
        
    }).catch(err => console.log(err))
}


    return ( <>
        <div style={FormStyle} >
            <div style={{border: "3px solid #3E468A"}} className="shadow p-5 mb-5 bg-white rounded">
                     <div className="loginTitle">EdiCoach</div>
                    <div className="loginSubTitle">Create an account to access EdiCoach</div>
                    <Form>
                    <div className="signup-subtitle">USER INFORMATION</div>
                    <div class="row">
                            <div class="col">
                                <Form.Group className="mb-3" controlId="firstname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" />
                                </Form.Group>
                            </div>
                            <div class="col">
                                <Form.Group className="mb-3" controlId="lastname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" placeholder="DD/MM/YYYY" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="text" placeholder="Enter gender" />
                        </Form.Group>
                        <div className="signup-subtitle">LOGIN INFORMATION</div>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ReferralCheckbox">
                            <Form.Check type="checkbox" label="Are you a referral?" />
                        </Form.Group>
                        <div id="errorMessage"></div>
                        <Button className="loginBtn" variant="primary" type="button" onClick={Register}>Sign Up</Button>
                    </Form>
                    <a className="loginLink" href = "/guest/login">Already have an account?</a>
                    
            </div>
        </div>
    </>)
}

export default Signup
