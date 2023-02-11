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
    

    return (
    <>
    <Container>
        <Row>
            <Col></Col>
            <Col xs="8" style={{height:"370px"}}>
                <div>
                    test
                </div>

            </Col>
            <Col></Col>
        </Row>
    </Container>
    </>
    )
}

export default test