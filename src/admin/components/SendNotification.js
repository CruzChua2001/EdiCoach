import {Form, Button} from 'react-bootstrap';
import React, { useState } from "react";
import axios from "axios";

const SendNotification = () => {

    const FormStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25px',
    
    };

    const [Forms, setForms] = useState({
        Subject : "",
        Message : ""
     })
     
     const send = () => {
        axios.post("https://wv704kalt9.execute-api.ap-southeast-1.amazonaws.com/UAT/sendnotification", JSON.stringify(Forms))
            .then(res => {
                window.location.href = "/admin/sendnotification"
                console.log(res)   
            }
            ).catch(err => console.log(err))
    }
    return ( <>

    
        <div style={FormStyle} >
            <div style={{border: "3px solid #3E468A"}} className="shadow p-5 mb-5 bg-white rounded">
                     <div className="loginTitle">Send Out Notifications</div>
                    <Form>
                    <Form.Group className="mb-3" controlId="Subject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="Enter Subject" value={Forms.Subject} onChange={(e) => setForms({...Forms, Subject: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Message">
                            <Form.Label>Content of Message</Form.Label>
                            <Form.Control type="text" placeholder="Enter message" value={Forms.Message} onChange={(e) => setForms({...Forms, Message: e.target.value})}/>
                        </Form.Group>
                        <Button className="loginBtn" variant="primary" type="button" onClick={send}>Send</Button>
                    </Form>
            </div>
        </div>
    </>)
    
 }

 
export default SendNotification
