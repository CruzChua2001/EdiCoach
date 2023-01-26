import React from "react";
import {Form, Button} from 'react-bootstrap';

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import config from '../../../config';

const poolData = config.poolData;

const CodeConfirmation = () => {

    const FormStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '125vh',
        marginTop: '25px',

    };

    const Confirm = () => {
        let code = document.getElementById("code").value;

        const UserPool = new CognitoUserPool(poolData);

        const userData = {
            Username: window.localStorage.getItem("username"),
            Pool: UserPool
        }

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(code, true, (err, data) => {
            if (err) {
                console.error(err);
                document.getElementById("errorMessage").innerHTML = err;
                document.getElementById("errorMessage").display = "block";
            }
            console.log(data);
            if (data == "SUCCESS") {
                location.href = "/guest/login";
            }
        })


    }


    return ( <>
        <div style={FormStyle} >
            <div style={{border: "3px solid #3E468A"}} className="shadow p-5 mb-5 bg-white rounded">
                    <div className="loginSubTitle">Enter confirmation Code</div>
                    <Form>
                        <Form.Group className="mb-3" controlId="code">
                            <Form.Label>Confirmation Code</Form.Label>
                            <Form.Control type="text" placeholder="XXXXXX" />
                        </Form.Group>
                        <div id="errorMessage"></div>
                        <Button className="loginBtn" variant="primary" type="button" onClick={Confirm}>Submit</Button>
                    </Form>
                    
            </div>
        </div>
    </>)
}

export default CodeConfirmation
