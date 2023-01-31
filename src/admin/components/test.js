import React, {useEffect, useState, useRef} from "react";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import config from '../../../config';

import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { X, ArrowClockwise } from 'react-bootstrap-icons'
import Dropdown from 'react-bootstrap/Dropdown';

import { DataGrid } from '@mui/x-data-grid';

import $ from 'jquery';
import { EmailOutlined } from "@mui/icons-material";

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = config.poolData;

const test = () => {

    // useEffect(() => {
        
    //     fetch("https://0kisdrt3g1.execute-api.us-east-1.amazonaws.com/dev/scan", {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' }})
    //         .then((msg) => {
    //             msg.json()
    //             .then(data => {
    //                 console.log(data);
    //             })
    //         }).catch(err => console.log(err))
    //     }, [])
    
    function goChat(userid, name, type) {
        console.log("test");
        window.localStorage.setItem("chatuserid", userid);
        window.localStorage.setItem("chatname", name);
        window.localStorage.setItem("chattype", type);
        location.href = "/admin/chat";
    }

    return (
    <>
    <Container>
        <Row>
            <Col></Col>
            <Col xs="8" style={{height:"370px"}}>
                <div id="test">
                    Chat with Coach or Client
                </div>
                <div>
                    <button style={{display:"block", marginBottom:"20px", marginTop:"20px"}} className="btn btn-primary" onClick={() => goChat("92e757f9-c2e1-4936-82b5-86ee87e6413a", "Ed Choo", "Coach")}>Chat coach</button>
                    <button className="btn btn-primary" onClick={() => goChat("5af3cd67-f0b7-4ca0-84d1-859ac25b246b", "Edison Choo", "Client")}>Chat client</button>
                </div>

            </Col>
            <Col></Col>
        </Row>
    </Container>
    </>
    )
}

export default test