import React, { useContext } from "react";
import {Form, Button} from 'react-bootstrap';

import bcrypt from 'bcryptjs';

import config from '../../../config';
import { AccountContext } from "../../Account";

import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const poolData = config.poolData;

const CoachLogin = () => {
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
                      
  
                  } else if (body.usertype == "Client") {
                    document.getElementById("errorMessage").innerText = "Login in client login page instead";
                }else {
  
                    authenticate(email, password)
                    .then((data) => {
                        cookies.set('accessToken', data.accessToken.jwtToken, { path: '/' });
                        cookies.set('userType', body.usertype, { path: '/' });
                        if (body.usertype == "Admin") {
                            window.location.href = "/admin/";
                        } else if (body.usertype == "Coach") {
                            window.location.href = "/coach/";
                        }
                    })
                    .catch((err) => {
                        document.getElementById("errorMessage").innerHTML = err;
                        document.getElementById("errorMessage").display = "block";
                    })
  
                  }
  
              });
              
              
          }).catch(err => console.log(err))
  
        //   fetch(config.USER_API+"/getsalt/"+email, {
        //   method: 'GET',
        //   headers: { 'Content-Type': 'application/json' }})
        //   .then((msg) => {
        //       msg.json()
        //       .then(salt => {
        //           if (salt == "Error") {
        //               document.getElementById("errorMessage").innerText = "Email not found";
  
        //           } else {
  
        //               let hash = bcrypt.hashSync(password, salt);

        //               let usertype;
  
        //               fetch(config.SESSION_API+"/login", {
        //                   method: 'POST',
        //                   body: JSON.stringify({email, password:hash}),
        //                   headers: { 'Content-Type': 'application/json' }})
        //                   .then((msg) => {
        //                       msg.json()
        //                       .then(message => {
        //                           console.log(message);
        //                           if (message.status === "success") {
        //                                 usertype = message.data.UserType.S;
        //                               fetch(config.SESSION_API+"/create", {
        //                                   method: 'POST',
        //                                   body: JSON.stringify(message.data),
        //                                   headers: { 'Content-Type': 'application/json' }})
        //                                   .then((msg) => {
        //                                       msg.json()
        //                                       .then(message => {
        //                                           if (message.status === "success") {
        //                                               console.log(message);
                                                      
  
        //                                               // window.localStorage.setItem("login", true);
        //                                               // window.localStorage.setItem("usertype", message.usertype);
        //                                               if (usertype == "Admin") {
        //                                                 setCookie("sessionId", message.userid, { path: '/' });
        //                                                 window.location.href = "/admin/";
        //                                               } else if (usertype == "Coach") {
        //                                                 setCookie("sessionId", message.userid, { path: '/' });
        //                                                 window.location.href = "/coach/";
        //                                               } else {
        //                                                 document.getElementById("errorMessage").innerText = "Please login using the correct tunnel!";
        //                                               }
                                                      
                                                      
        //                                           } else {
        //                                               document.getElementById("errorMessage").innerText = message.message;
                                                      
        //                                           }
        //                                       });
                                              
                                              
        //                                   }).catch(err => console.log(err))
  
        //                           } else {
        //                               document.getElementById("errorMessage").innerText = message.message;
                                      
        //                           }
        //                       });
                              
                              
        //                   }).catch(err => console.log(err))
  
        //           }
  
        //       });
              
              
        //   }).catch(err => console.log(err))
  
          
      }
  
      const Logout = () => {
          removeCookie("sessionId");
      }
    
    return ( <>
        <div style={FormStyle} >
            <div style={{border: "3px solid #3E468A"}} class="shadow p-5 mb-5 bg-white rounded">
            <div className="loginTitle">EdiCoach</div>
                    <div className="loginSubTitle">Welcome back to EdiCoach, Coaches</div>
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
    </>)
}


export default CoachLogin