import React from "react";
import {Form, Button} from 'react-bootstrap';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { OAuth2Client } from 'google-auth-library';

import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

import config from '../../../config';

const poolData = config.poolData;

const ChooseSignup = () => {

const FormStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'

};

const onSuccess = async (res) => {
    console.log(res);

    let googlePayload
    const oauthClient = new OAuth2Client(config.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
    const ticket = await oauthClient.verifyIdToken({
    idToken: res.credential,
    audience: config.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    })
    googlePayload = ticket.getPayload()
    console.log(googlePayload)

    let email = googlePayload.email;
    let password = googlePayload.sub;

    const UserPool = new CognitoUserPool(poolData);

    let attributeList = [];

    var dataRegistratiion = {
        Name: 'custom:registration',
        Value: "google",
    }

    var attributeRegistration = new CognitoUserAttribute(dataRegistratiion);
    
    attributeList.push(attributeRegistration);

    let clientMetadata = {
        'EmailVerified': googlePayload.email_verified.toString()
    }

    UserPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
            console.error(err);
            document.getElementById("errorMessage").innerHTML = err;
            document.getElementById("errorMessage").display = "block";
        }
        console.log(data);
        if (data) {
            window.localStorage.setItem("email", data["user"]["username"]);
            window.localStorage.setItem("username", data["userSub"]);
            window.location.href = "/guest/contsignup";
        }
        
    })

  }

  const onFailure = (res) => {
    console.log(res);
    document.getElementById("errorMessage").innerHTML = res;
    document.getElementById("errorMessage").display = "block";
  }

    return ( <>
        <div style={FormStyle} >
            <div style={{border: "3px solid #3E468A"}} className="shadow p-5 mb-5 bg-white rounded">
                     <div className="loginTitle">EdiCoach</div>
                    <div className="loginSubTitle">Choose Register Method</div>
                    <Button className="loginBtn" variant="primary" type="button" onClick={() => location.href = "/guest/sign-up"}>Sign Up with Email</Button>
                    <hr/>
                    <GoogleOAuthProvider clientId={config.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        width="100%"
                        />
                    </GoogleOAuthProvider>
                    <div id="errorMessage" style={{width:"210px",marginTop:"10px"}}></div>
                    
            </div>
        </div>
    </>)
}

export default ChooseSignup
