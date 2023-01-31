import React, {useEffect, useState, useRef} from "react";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import config from '../../../config';

// import { Button } from "react-bootstrap";
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

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
        { field: 'email', headerName: 'Email', width: 210 },
        { field: 'usertype', headerName: 'UserType', width: 188 },
        { field: 'phone', headerName: 'Phone', width: 188 },
      ];

    const retrieveUsers = () => {
        fetch(config.TEST_API+"/getall", {
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

        fetch(config.TEST_API+"/add", {
        method: 'POST',
        body: JSON.stringify({email, password: password, salt, firstname, lastname, dob, phone, gender, userid, usertype, skills:""}),
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
        handleClose();
        let email = selectedUser;
        console.log(email);

        // const UserPool = new CognitoUserPool(poolData);

        // const userData = {
        //     Username: email,
        //     Pool: UserPool
        // }

        // const cognitoUser = new CognitoUser(userData);

        // cognitoUser.deleteUser((err, data) => {
        //     if (err) {
        //         console.error(err);
        //     }
        //     console.log(data);
        //     // retrieveUsers();
        // })

        fetch(config.TEST_API+`/delete/`+email, {
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
            row.push({ id: element.userid.S, email: element.email.S, lastname: element.lastname.S, firstname: element.firstname.S, usertype: element.usertype.S, phone: element.phone.S })
        }
        console.log(row);
        setRows(row);
    }, [users])

    useEffect(() => {
        retrieveUsers();

        $("#basic-button").on("click", function() {
            setTimeout(() => {
                if ($(".Mui-selected").length == 1) {
                    let selectedEmail = $(".Mui-selected").find(".MuiDataGrid-cellContent").get(1).innerHTML
                    setSelectedUser(selectedEmail);
                    $(".MuiList-root li").removeClass("li-disabled");
                    // $(".MuiList-root li").attr("aria-disabled", "false");
                } else {
                    $(".MuiList-root li").addClass("li-disabled");
                    $(".MuiList-root li").first().removeClass("li-disabled");
                    // $(".MuiList-root li").attr("aria-disabled", "true");
                    // $(".MuiList-root li").first().attr("aria-disabled", "false");
                }

                // if ($(".dropdown-menu").css("display") == "none") {
                //     $(".dropdown-menu").show();
                // } else {
                //     $(".dropdown-menu").hide();
                // }

                $(".show").show();
                
            }, 100)
            
        })
    }, [])


    const openAdd = () => {
        console.log("Opening...")
        $(".dropdown-menu").hide();
        handleClose();
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
        handleClose()

        let selectedProfile = users.filter(user => user.email.S == selectedUser)[0];

        console.log(selectedProfile)

        document.getElementById("firstnamelabel").innerHTML = selectedProfile.firstname.S;
        document.getElementById("lastnamelabel").innerHTML = selectedProfile.lastname.S;
        document.getElementById("emaillabel").innerHTML = selectedProfile.email.S;
        document.getElementById("phonelabel").innerHTML = selectedProfile.phone.S;
        document.getElementById("genderlabel").innerHTML = selectedProfile.gender.S;
        document.getElementById("doblabel").innerHTML = selectedProfile.dob.S;
        document.getElementById("usertypelabel").innerHTML = selectedProfile.usertype.S;

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    

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
            <Col xs="12" style={{height:"370px"}}>
                <div className="admin-table-title">
                    <div>
                        TABLE OF ALL USERS
                    </div>
                    <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        style={{marginRight:"35px"}}
                    >
                        Actions
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={openAdd}>Add User</MenuItem>
                        <MenuItem onClick={deleteUser}>Delele User</MenuItem>
                        <MenuItem onClick={openProfile}>View Details</MenuItem>
                    </Menu>
                    </div>
                    {/* <div>
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
                    </div> */}
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