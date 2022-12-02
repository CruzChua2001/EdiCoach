import React from "react";
import {Form, Button} from 'react-bootstrap';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const Signup = () => {

const FormStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    marginTop: '75px'
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

    fetch("https://1b46sbaptd.execute-api.us-east-1.amazonaws.com/dev/register", {
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
            <div class="shadow p-5 mb-5 bg-white rounded">
                    <Form>
                    <div className="signup-subtitle">USER INFORMATION</div>
                    <div class="row">
                            <div class="col">
                                <Form.Group className="mb-3" controlId="FirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" id="firstname" placeholder="First Name" />
                                </Form.Group>
                            </div>
                            <div class="col">
                                <Form.Group className="mb-3" controlId="LastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" id="lastname" placeholder="Last Name" />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="DOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" id="dob" placeholder="DD/MM/YYYY" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" id="phone" placeholder="Enter phone number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="text" id="gender" placeholder="Enter gender" />
                        </Form.Group>
                        <div className="signup-subtitle">LOGIN INFORMATION</div>
                        <Form.Group className="mb-3" controlId="SignUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" id="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="SignUpPassword" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ReferralCheckbox">
                            <Form.Check type="checkbox" label="Are you a referral?" />
                        </Form.Group>
                        <div id="errorMessage"></div>
                        <Button variant="primary" type="button" onClick={Register}>Sign Up</Button>
                    </Form>
                    <a href = "/guest/login">Already have an account?</a>
                    
            </div>
        </div>
    </>)
}

export default Signup
