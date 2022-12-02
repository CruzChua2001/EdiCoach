import React from "react";
import { Form, Button } from 'react-bootstrap';

import bcrypt from 'bcryptjs';
import { useCookies } from 'react-cookie';

const Login = () => {
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

                      let usertype;
  
                      fetch("https://1b46sbaptd.execute-api.us-east-1.amazonaws.com/dev/login", {
                          method: 'POST',
                          body: JSON.stringify({email, password:hash}),
                          headers: { 'Content-Type': 'application/json' }})
                          .then((msg) => {
                              msg.json()
                              .then(message => {
                                  console.log(message);
                                  if (message.status === "success") {
                                        usertype = message.data.UserType.S;
                                      fetch("https://1b46sbaptd.execute-api.us-east-1.amazonaws.com/dev/create", {
                                          method: 'POST',
                                          body: JSON.stringify(message.data),
                                          headers: { 'Content-Type': 'application/json' }})
                                          .then((msg) => {
                                              msg.json()
                                              .then(message => {
                                                  if (message.status === "success") {
                                                      console.log(message);
  
                                                      // window.localStorage.setItem("login", true);
                                                      // window.localStorage.setItem("usertype", message.usertype);
                                                      if (usertype == "Client") {
                                                        setCookie("sessionId", message.userid, { path: '/' });
                                                        window.location.href = "/client/";
                                                      } else {
                                                        document.getElementById("errorMessage").innerText = "Please login using the correct tunnel!";
                                                      }
                                                      
                                                      
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
    
    return ( <>
        <div style={FormStyle} >
            <div class="shadow p-5 mb-5 bg-white rounded">
                    <Form>
                        <Form.Group className="mb-3" controlId="LoginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" id='email' placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="LoginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id='password' placeholder="Password" />
                        </Form.Group>
                        <div id="errorMessage"></div>
                        <Button variant="primary" type="button" onClick={Login}>Login</Button>
                    </Form>
                    <a href = "/guest/sign-up">Create an Account</a>
            </div>
        </div>
    </>)
}


export default Login