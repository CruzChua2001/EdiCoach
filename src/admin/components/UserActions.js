import React, {useEffect, useState, useRef} from "react";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

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

const UserActions = () => {

    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    let columns = [
        {
          field: 'fullName',
          headerName: 'Full name',
          width: 186,
          valueGetter: (params) =>
            `${params.row.firstname || ''} ${params.row.lastname || ''}`,
        },
        { field: 'email', headerName: 'Email', width: 186 },
        { field: 'dob', headerName: 'DOB', width: 188 },
      ];

    const retrieveUsers = () => {
        fetch("https://mj1rmiz1mj.execute-api.us-east-1.amazonaws.com/dev/getall", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(users => {
                console.log(users);
                setUsers(users);
            });
            
            
        }).catch(err => console.log(err))
    }

    const addUser = () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let firstname = document.getElementById("firstname").value;;
        let lastname = document.getElementById("lastname").value;;
        let dob = document.getElementById("dob").value;;
        let phone = document.getElementById("phone").value;;
        let gender = document.getElementById("gender").value;;
        let userid = uuidv4();
        let usertype = document.getElementById("usertype").value;;

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        fetch("https://mj1rmiz1mj.execute-api.us-east-1.amazonaws.com/dev/add", {
        method: 'POST',
        body: JSON.stringify({email, password: hash, salt, firstname, lastname, dob, phone, gender, userid, usertype}),
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(users => {
                console.log(users)
                retrieveUsers();
            });
            
            
        }).catch(err => console.log(err))
    }

    const deleteUser = () => {
        let email = selectedUser;
        console.log(email);
        fetch(`https://iipemcorb8.execute-api.us-east-1.amazonaws.com/dev/delete/`+email, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(users => {
                console.log(users)
                retrieveUsers();
                closeAdd();
            });
            
            
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        var text = "";
        let row = [];
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            row.push({ id: element.UserId.S, email: element.Email.S, lastname: element.LastName.S, firstname: element.FirstName.S, dob: element.DOB.S })
        }
        console.log(row);
        setRows(row);
    }, [users])

    useEffect(() => {
        retrieveUsers();

        $(".dropdown-toggle").on("click", function() {
            setTimeout(() => {
                if ($(".Mui-selected").length == 1) {
                    let selectedEmail = $(".Mui-selected").find(".MuiDataGrid-cellContent").get(1).innerHTML
                    setSelectedUser(selectedEmail);
                    $(".dropdown-menu a").removeClass("disabled");
                    $(".dropdown-menu a").attr("aria-disabled", "false");
                } else {
                    $(".dropdown-menu a").addClass("disabled");
                    $(".dropdown-menu a").first().removeClass("disabled");
                    $(".dropdown-menu a").attr("aria-disabled", "true");
                    $(".dropdown-menu a").first().attr("aria-disabled", "false");
                }
            }, 100)
            
        })
    }, [])


    const openAdd = () => {
        console.log("Opening...")
        document.getElementsByClassName("popup-content").item(0).style.display = "block";
    }

    

    const closeAdd = () => {
        console.log("Closing...")
        document.getElementsByClassName("popup-content").item(0).style.display = "none";
    } 
    

    return (
    <>
    <div className="popup-background"></div>
    <Container className="popup-container">
        <Row>
            <Col></Col>
            <Col xs="8"  className="popup-content">
            <div className="popup-title">
                <div>Enter New User Information</div>
                <X color="white" size={32} style={{cursor: "pointer"}} onClick={closeAdd}/>
            </div>
            <Form>
                
                <div className="popup-subtitle">LOGIN INFORMATION</div>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" id="firstname" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" id="lastname" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="password"/>
                    <Form.Text className="text-muted">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Form.Group>

                <div className="popup-subtitle">USER INFORMATION</div>
                <Form.Group className="mb-3" >
                    <Form.Label>Phone Number</Form.Label>
                    <Row>
                        <Col xs="2">
                            <Form.Control type="text" value="+65" id="countrycode" disabled />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Enter phone number" id="phonenumber" />
                        </Col>
                    </Row>
                    
                </Form.Group>

                
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" placeholder="Enter gender" id="gender" />
                    {/* <Form.Select>
                        <option>Select gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Prefer not to say</option>
                    </Form.Select> */}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="text" placeholder="Enter date of birth" id="dob" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>User Type</Form.Label>
                    <Form.Control type="text" placeholder="Enter user type" id="usertype" />
                    {/* <Form.Select>
                        <option>Select gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Prefer not to say</option>
                    </Form.Select> */}
                </Form.Group>

                <Button variant="primary" onClick={addUser}>
                    Submit
                </Button>
            </Form>
            </Col>
            <Col></Col>
        </Row>
    </Container>
    <Container className="admin-table">
        <Row>
            <Col></Col>
            <Col xs="8" style={{height:"362px"}}>
                <div className="admin-table-title">
                    <div>
                        ALL USERS TABLES
                    </div>
                    <div>
                    <ArrowClockwise />
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={openAdd}>Add User</Dropdown.Item>
                            <Dropdown.Item onClick={deleteUser}>Delele User</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">View Details</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                </div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                
            />
            </Col>
            <Col></Col>
        </Row>
    </Container>
    </>
    )
}

export default UserActions