import React from "react";
import {Form, Button} from 'react-bootstrap';

const Signup = () => {

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
                    <div class="row">
                            <div class="col">
                                <Form.Group className="mb-3" controlId="FirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" />
                                </Form.Group>
                            </div>
                            <div class="col">
                                <Form.Group className="mb-3" controlId="LastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="DOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" placeholder="DD/MM/YYYY" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="SignUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="SignUpPassword" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ReferralCheckbox">
                            <Form.Check type="checkbox" label="Are you a referral?" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Sign Up</Button>
                    </Form>
                    <a href = "/guest/login">Already have an account?</a>
            </div>
        </div>
    </>)
}

export default Signup