import React, { useContext } from "react";
import {Form, Button} from 'react-bootstrap';

import bcrypt from 'bcryptjs';
import { useCookies } from 'react-cookie';

import config from '../../../config';
import { AccountContext } from "../../Account";

import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = config.poolData;

const Login = () => {
    const { authenticate } = useContext(AccountContext);

    const FormStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      };

      const [cookies, setCookie, removeCookie] = useCookies(['name']);

      const Login = () => {
          let email = document.getElementById("email").value;
          let password = document.getElementById("password").value;
  
          fetch(config.TEST_API+"/getusertype/"+email, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }})
          .then((msg) => {
              msg.json()
              .then(type => {
                  if (type == "Error") {
                    document.getElementById("errorMessage").innerText = "Email or password is incorrect";
                      
  
                  } else if (type !== "Client") {
                    document.getElementById("errorMessage").innerText = "Login in coach login page instead";
                }else {
  
                    authenticate(email, password)
                    .then((data) => {
                        location.href = "/client/";
                    })
                    .catch((err) => {
                        document.getElementById("errorMessage").innerHTML = err;
                        document.getElementById("errorMessage").display = "block";
                    })
  
                  }
  
              });
              
              
          }).catch(err => console.log(err))
          
      }
  
      const Logout = () => {
          removeCookie("sessionId");
      }
    
    return ( <>
        <div style={FormStyle} >
            <div style={{border: "3px solid #3E468A"}} class="d-flex shadow p-5 mb-5 bg-white rounded">
                <div className="mr-2">
                    <img src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/TWC_Online-Therapy-01.png" width="400" height="400" />
                </div>
                <div>
                    <div className="loginTitle">EdiCoach</div>
                    <div className="loginSubTitle">Welcome back to EdiCoach, Clients</div>
                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div id="errorMessage"></div>
                        <Button className="loginBtn" variant="primary" type="button" onClick={Login}>Login</Button>
                    </Form>
                    <a className="loginLink" href = "/guest/sign-up">Create an Account</a>
                </div>
            </div>
        </div>
    </>)
}


export default Login