import React from "react";
import {Form, Button} from 'react-bootstrap';

const Login = () => {
    const FormStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      };
    
    return ( <>
        <div style={FormStyle} >
            <div class="shadow p-5 mb-5 bg-white rounded">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                    <a href = "/guest/sign-up">Create an Account</a>
            </div>
        </div>
    </>)
}


export default Login