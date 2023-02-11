import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Contact = () => {
    return (
        <Container>
            <div className="mt-5 row">
                <div className="mt-5 col-12 col-md-6">
                    <h3>Contact us</h3>

                    <p>Need to get in touch with us? Fill in the form with your inquiry and we will get back to you within 3 business days.</p>

                    <h3>Reach us</h3>

                    <div className="row">
                        <div className="col-6">Email:</div>
                        <div className="col-6">support@EDICOACH.com</div>

                        <div className="col-6">Phone no.:</div>
                        <div className="col-6">+65 6293 0293</div>

                        <div className="col-6">Address:</div>
                        <div className="col-6">Blk 293 Ang Mo Kio St 21 #01-203 Singapore 839293</div>
                    </div>
                </div>
                <div className="mt-5 col-12 col-md-6">
                    <div className="mt-3 d-flex">
                        <div className="me-2">
                            <span>First name</span>
                            <Form.Control type="text" />
                        </div>
                        <div>
                            <span>Last name</span>
                            <Form.Control type="text" />
                        </div>
                    </div>

                    <span>Email</span>
                    <Form.Control type="text" style={{width: "90%"}} />

                    <span>What can we help you with?</span>
                    <Form.Control as="textarea" style={{width: "90%"}} />

                    <Button className="mt-3">Submit</Button>
                </div>
            </div>
            
        </Container>
    )
}

export default Contact