import React from "react";
import {Form, Button} from 'react-bootstrap';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

import config from '../../../config';

const poolData = config.poolData;

const ContSignup = () => {

const FormStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '125vh',
    marginTop: '25px',

};

const Register = () => {
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let dob = document.getElementById("dob").value;
    let phone = document.getElementById("phone").value;;
    let gender = document.getElementById("gender").value;;
    let email = window.localStorage.getItem("email");
    let userid = window.localStorage.getItem("username");

    let usertype = "Client";

    fetch(config.USER_MANAGEMENT_API+"/update", {
    method: 'PUT',
    body: JSON.stringify({email, firstname, lastname, dob, phone, gender, usertype, userid}),
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
                    <div className="loginSubTitle">Enter the form to complete the registration</div>
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
                        <div id="errorMessage"></div>
                        <Button className="loginBtn" variant="primary" type="button" onClick={Register}>Done</Button>
                    </Form>
                    
            </div>
        </div>
    </>)
}

export default ContSignup
