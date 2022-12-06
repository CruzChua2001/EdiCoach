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
        { field: 'usertype', headerName: 'UserType', width: 188 },
      ];

    const retrieveUsers = () => {
        fetch(config.USER_API+"/getall", {
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

        fetch(config.USER_API+"/add", {
        method: 'POST',
        body: JSON.stringify({email, password: hash, salt, firstname, lastname, dob, phone, gender, userid, usertype}),
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

    const deleteUser = () => {
        $(".dropdown-menu").hide();
        let email = selectedUser;
        console.log(email);
        fetch(config.USER_API+`/delete/`+email, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(users => {
                console.log(users)
                retrieveUsers();
            });
            
            
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        var text = "";
        let row = [];
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            row.push({ id: element.UserId.S, email: element.Email.S, lastname: element.LastName.S, firstname: element.FirstName.S, usertype: element.UserType.S })
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

                if ($(".dropdown-menu").css("display") == "none") {
                    $(".dropdown-menu").show();
                } else {
                    $(".dropdown-menu").hide();
                }

                $(".show").show();
                
            }, 100)
            
        })
    }, [])


    const openAdd = () => {
        console.log("Opening...")
        $(".dropdown-menu").hide();
        document.getElementsByClassName("popup-background").item(0).style.display = "block";
        document.getElementsByClassName("popup-content").item(0).style.display = "block";
    }

    

    const closeAdd = () => {
        console.log("Closing...")
        document.getElementsByClassName("popup-background").item(0).style.display = "none";
        document.getElementsByClassName("popup-content").item(0).style.display = "none";
    } 

    const openProfile = () => {
        console.log("Opening...")
        $(".dropdown-menu").hide();

        let selectedProfile = users.filter(user => user.Email.S == selectedUser)[0];

        console.log(selectedProfile)

        document.getElementById("firstnamelabel").innerHTML = selectedProfile.FirstName.S;
        document.getElementById("lastnamelabel").innerHTML = selectedProfile.LastName.S;
        document.getElementById("emaillabel").innerHTML = selectedProfile.Email.S;
        document.getElementById("phonelabel").innerHTML = selectedProfile.Phone.S;
        document.getElementById("genderlabel").innerHTML = selectedProfile.Gender.S;
        document.getElementById("doblabel").innerHTML = selectedProfile.DOB.S;
        document.getElementById("usertypelabel").innerHTML = selectedProfile.UserType.S;

        document.getElementsByClassName("popup-background").item(0).style.display = "block";
        document.getElementsByClassName("popup-profile-content").item(0).style.display = "block";
    }

    

    const closeProfile = () => {
        console.log("Closing...")
        document.getElementsByClassName("popup-background").item(0).style.display = "none";
        document.getElementsByClassName("popup-profile-content").item(0).style.display = "none";
    }

    const toggleBtn = () => {
        if (document.getElementsByClassName("dropdown-menu").item(0)) {
            let visible = document.getElementsByClassName("dropdown-menu").item(0).style.display;
            if (visible != "block") {
                document.getElementsByClassName("dropdown-menu").item(0).style.display = "block";
            } else {
                document.getElementsByClassName("dropdown-menu").item(0).style.display = "none";
            }
        }
        
        
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
                        <Form.Group controlId="firstname" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastname" className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                    <Form.Text className="text-muted">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Form.Group>

                <div className="popup-subtitle">USER INFORMATION</div>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Row>
                        <Col xs="2">
                            <Form.Control type="text" value="+65" disabled />
                        </Col>
                        <Col>
                            <Form.Control type="text" id="phone" placeholder="Enter phone number" />
                        </Col>
                    </Row>
                    
                </Form.Group>

                
                <Form.Group className="mb-3" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" placeholder="Enter gender" />
                    {/* <Form.Select>
                        <option>Select gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Prefer not to say</option>
                    </Form.Select> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="text" placeholder="Enter date of birth" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="usertype">
                    <Form.Label>User Type</Form.Label>
                    <Form.Control type="text" placeholder="Enter user type" />
                    {/* <Form.Select>
                        <option>Select gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Prefer not to say</option>
                    </Form.Select> */}
                </Form.Group>

                <Button variant="primary" onClick={addUser}>
                    Add User
                </Button>
            </Form>
            </Col>
            <Col></Col>
        </Row>
    </Container>
    <Container className="popup-container">
        <Row>
            <Col></Col>
            <Col xs="8"  className="popup-profile-content">
            <div className="popup-title">
                <div>User Information</div>
                <X color="white" size={32} style={{cursor: "pointer"}} onClick={closeProfile}/>
            </div>
            <Form>
                
                <div className="popup-subtitle">LOGIN INFORMATION</div>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <div className="popup-label" id="firstnamelabel">-</div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <div className="popup-label" id="lastnamelabel">-</div>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <div className="popup-label" id="emaillabel">-</div>
                </Form.Group>

                <div className="popup-subtitle">USER INFORMATION</div>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <div className="popup-label" id="phonelabel">-</div>
                    
                </Form.Group>

                
                <Form.Group className="mb-3" >
                    <Form.Label>Gender</Form.Label>
                    <div className="popup-label" id="genderlabel">-</div>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Date of Birth</Form.Label>
                    <div className="popup-label" id="doblabel">-</div>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>User Type</Form.Label>
                    <div className="popup-label" id="usertypelabel">-</div>
                </Form.Group>

            </Form>
            </Col>
            <Col></Col>
        </Row>
    </Container>
    <Container className="admin-table">
        <Row>
            <Col></Col>
            <Col xs="8" style={{height:"370px"}}>
                <div className="admin-table-title">
                    <div>
                        TABLE OF ALL USERS
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
                            <Dropdown.Item onClick={openProfile}>View Details</Dropdown.Item>
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