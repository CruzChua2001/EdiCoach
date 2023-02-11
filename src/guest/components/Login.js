import React, { useContext } from "react";
import {Form, Button} from 'react-bootstrap';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { OAuth2Client } from 'google-auth-library';

import bcrypt from 'bcryptjs';

import config from '../../../config';
import { AccountContext } from "../../Account";

import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const poolData = config.poolData;

const Login = () => {
    const { authenticate } = useContext(AccountContext);

    const FormStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      };

      const Login = () => {
          let email = document.getElementById("email").value;
          let password = document.getElementById("password").value;
  
          fetch(config.USER_MANAGEMENT_API+"/getusertype/"+email, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }})
          .then((msg) => {
              msg.json()
              .then(body => {
                if (body.usertype == "Error") {
                    document.getElementById("errorMessage").innerText = "Email or password is incorrect";
                } else if (body.usertype !== "Client") {
                    document.getElementById("errorMessage").innerText = "Login in coach login page instead";
                } else if (body.registration == "google") {
                    document.getElementById("errorMessage").innerText = "Email is registed with google authentication";
                } else {

                    authenticate(email, password)
                    .then((data) => {
                        // console.log(data)
                        cookies.set('accessToken', data.accessToken.jwtToken, { path: '/' });
                        cookies.set('userType', body.usertype, { path: '/' });
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
  
      const onSuccess = async (res) => {
        console.log(res);

        let googlePayload
        const oauthClient = new OAuth2Client(config.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
        const ticket = await oauthClient.verifyIdToken({
        idToken: res.credential,
        audience: config.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        })
        googlePayload = ticket.getPayload()
        console.log(ticket)
        console.log(googlePayload)

        if (googlePayload.iss == "https://accounts.google.com" && googlePayload.aud == config.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
            fetch(config.USER_MANAGEMENT_API+"/getusertype/"+googlePayload.email, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }})
                .then((msg) => {
                    msg.json()
                    .then(body => {
                        if (body == "Error") {
                            document.getElementById("errorMessage").innerText = "Email or password is incorrect";
                        } else if (body.usertype !== "Client") {
                            document.getElementById("errorMessage").innerText = "Login in coach login page instead";
                        } else if (body.registration == "website") {
                            document.getElementById("errorMessage").innerText = "Email is registed with website authentication";
                        } else {
        
                          authenticate(googlePayload.email, googlePayload.sub)
                          .then((data) => {
                              // console.log(data)
                              cookies.set('accessToken', data.accessToken.jwtToken, { path: '/' });
                              cookies.set('userType', body.usertype, { path: '/' });
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

      }

      const onFailure = (res) => {
        console.log(res);
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
                        <div id="errorMessage" ></div>
                        <Button className="loginBtn" variant="primary" type="button" onClick={Login}>Login</Button>
                    </Form>
                    <a className="loginLink" href = "/guest/chooseSignup">Create an Account Here</a>
                    <hr/>
                    <GoogleOAuthProvider clientId={config.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        width="100%"
                        />
                    </GoogleOAuthProvider>
                    
                </div>
            </div>
        </div>
    </>)
}


export default Login