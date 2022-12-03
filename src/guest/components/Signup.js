<<<<<<< Updated upstream
import React from "react";
import {Form, Button} from 'react-bootstrap';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
=======
import { Password } from "@mui/icons-material";
import React, { useState } from "react";
import { Form, Button, Dropdown } from 'react-bootstrap';
>>>>>>> Stashed changes

const Signup = () => {

const FormStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    marginTop: '75px'
};

<<<<<<< Updated upstream
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

=======
const submit = () => {
    fetch("https://vonlxpnb0j.execute-api.us-east-1.amazonaws.com/UAT/postcoachapplication", {
        method: "POST",
        body: Forms
        
    })
    .then(response=>console.log(response))
}

const [Forms, setForms] = useState({
    FirstName: "",
    LastName : "",
    DateOfBirth : "",
    Phone : "",
    Gender : "",
    Email : "",
    Password : "",
    ConfirmPassword : "",
    UserType: "Client"
 })

 const Submit = (e) => {
    e.preventDefault()
    console.log(Forms)
}
>>>>>>> Stashed changes

    return ( <>
        <div style={FormStyle} >
            <div class="shadow p-5 mb-5 bg-white rounded">
                    <Form>
                    <div className="signup-subtitle">USER INFORMATION</div>
                    <div class="row">
                            <div class="col">
                                <Form.Group className="mb-3" controlId="FirstName">
                                    <Form.Label>First Name</Form.Label>
<<<<<<< Updated upstream
                                    <Form.Control type="text" id="firstname" placeholder="First Name" />
=======
                                    <Form.Control type="text" placeholder="First Name" value={Forms.FirstName} onChange={(e) => setForms({...Forms, FirstName: e.target.value})} />
>>>>>>> Stashed changes
                                </Form.Group>
                            </div>
                            <div class="col">
                                <Form.Group className="mb-3" controlId="LastName">
                                    <Form.Label>Last Name</Form.Label>
<<<<<<< Updated upstream
                                    <Form.Control type="text" id="lastname" placeholder="Last Name" />
=======
                                    <Form.Control type="text" placeholder="Last Name" value={Forms.LastName} onChange={(e) => setForms({...Forms, LastName: e.target.value})} />
>>>>>>> Stashed changes
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="DOB">
                            <Form.Label>Date of Birth</Form.Label>
<<<<<<< Updated upstream
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
=======
                            <Form.Control type="text" placeholder="DD/MM/YYYY" value={Forms.DateOfBirth} onChange={(e) => setForms({...Forms, DateOfBirth: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="PhoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="text" placeholder="12345678" value={Forms.Phone} onChange={(e) => setForms({...Forms, Phone: e.target.value})} />
                        </Form.Group>
                        <Dropdown.Menu show>
                            <Dropdown.Header>Gender</Dropdown.Header>
                            <Dropdown.Item eventKey="2">Male</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Female</Dropdown.Item>
                        </Dropdown.Menu>
                        <Form.Group className="mb-3" controlId="SignUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={Forms.Email} onChange={(e) => setForms({...Forms, Email: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="SignUpPassword" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={Forms.Password} onChange={(e) => setForms({...Forms, Password: e.target.value})}/>
>>>>>>> Stashed changes
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" value={Forms.ConfirmPassword} onChange={(e) => setForms({...Forms, ConfirmPassword: e.target.value})} />
                        </Form.Group>
<<<<<<< Updated upstream
                        <div id="errorMessage"></div>
                        <Button variant="primary" type="button" onClick={Register}>Sign Up</Button>
=======
                        <Button variant="primary" type="submit" onClick={submit}>Sign Up</Button>
>>>>>>> Stashed changes
                    </Form>
                    <a href = "/guest/login">Already have an account?</a>
                    
            </div>
        </div>
    </>)
}

export default Signup
