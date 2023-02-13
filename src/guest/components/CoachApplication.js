import React, {useEffect, useState, useRef} from "react";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

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
import { width } from "@mui/system";

const CoachApplication = () => {

    const [rows, setRows] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [open, setOpen] = useState(false);

    let columns = [
        {
          field: 'firstName',
          headerName: 'First name'
        },
        {
            field: 'lastName',
            headerName: 'Last name'
        },
        { 
            field: 'email', 
            headerName: 'Email'
        },
        { 
            field: 'dob', 
            headerName: 'Date of Birth'
        },
        { 
            field: 'phone', 
            headerName: 'Phone'
        },
        { 
            field: 'gender', 
            headerName: 'Gender'
        },
        { 
            field: 'skills', 
            headerName: 'Skills'
        },
        { 
            field: 'userType', 
            headerName: 'User Type'
        }     
      ];

    
    
    useEffect(()=>{
        const retrieveUsers = () => {
            fetch("https://wv704kalt9.execute-api.ap-southeast-1.amazonaws.com/UAT/postcoachapplication", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }})
            .then((msg) => {
                msg.json()
                .then(resjson => {
                    console.log(users);
                    setUsers(
                        resjson.body.map((coach, index) => {
                            return {
                                id : index,
                                firstName : coach.FirstName,
                                lastName :  coach.LastName,
                                email : coach.Email,
                                dob : coach.DateofBirth,
                                phone : coach.Phone,
                                gender : coach.Gender,
                                skills : coach.Skills,
                                password : coach.HashPassword,
                                userType : coach.userType
                            }
                        })
                    );
                    console.log(resjson.body)
                });   
                }).catch(err => console.log(err))
            }
            retrieveUsers()
            
    }, [])

    const retrieveUsers = () => {
        fetch("https://wv704kalt9.execute-api.ap-southeast-1.amazonaws.com/UAT/postcoachapplication", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(resjson => {
                console.log(users);
                setUsers(
                    resjson.body.map((coach, index) => {
                        return {
                            id : index,
                            firstName : coach.FirstName,
                            lastName :  coach.LastName,
                            email : coach.Email,
                            dob : coach.DateofBirth,
                            phone : coach.Phone,
                            gender : coach.Gender,
                            skills : coach.Skills,
                            password : coach.HashPassword,
                            userType : coach.userType
                        }
                    })
                );
                console.log(resjson.body)
            });   
            }).catch(err => console.log(err))
        }

    const addUser = async() => {
        Promise.all(selectedUsers.map(async(selectedUser) => {
            console.log(selectedUser)
            const email = selectedUser.email
            return await fetch(config.TEST_API+"/add", {
                method: 'POST',
                body: JSON.stringify({
                                        email: selectedUser.email, 
                                        password: selectedUser.password, 
                                        firstname: selectedUser.firstName, 
                                        lastname: selectedUser.lastName, 
                                        dob: selectedUser.dob, 
                                        phone: selectedUser.phone, 
                                        gender: selectedUser.gender, 
                                        userid: selectedUser.id, 
                                        skills: selectedUser.skills,
                                        usertype : "Coach",
                                        registration : "website"
                                    }),
                headers: { 'Content-Type': 'application/json' }})
                .then((msg) => {
                    msg.json()
                    .then(users => {
                        console.log(users)

                        deleteUser(email)
                    });
                    
                    
                }).catch(err => console.log(err))
        }))
    }
    // const addSkill = () => {
    //     axios.post("https://wv704kalt9.execute-api.ap-southeast-1.amazonaws.com/UAT/skills", JSON.stringify({
    //                                     Email: selectedUser.email, 
    //                                     userid: selectedUser.id, 
    //                                     skills: selectedUser.skills,
    //                                     usertype: "Coach"
    //                                 }))
    //             .then(msg => {
    //                 console.log(msg)
    //                 alert("User verified")
    //                 });
    // }

    const deleteUser = (email) => {
        console.log(email);
        fetch(`https://wv704kalt9.execute-api.ap-southeast-1.amazonaws.com/UAT/postcoachapplication`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({"Email" : email})
    }).then((msg) => {
            msg.json()
            .then(users => {
                console.log(users)
                window.location.href = "/guest/coachapplication"
            });
            
            
        }).catch(err => console.log(err))
    }

    const onSelect = (coachIndex) => {
        const coachIndexSet = new Set(coachIndex)
        const selected = users.filter(user => {
            return coachIndexSet.has(user.id)
        })
        setSelectedUsers(selected)
        console.log(selected)
    }

    return (<>
    <Container className="admin-table" style={{paddingBottom: "10%"}}>
        <Row>
            <Col></Col>
            <Col xs="8" style={{height:"362px"}}>
                <div style = { { display: "flex", flexDirection : "row", justifyContent: "space-between"} }>
                    <div>
                        ALL USERS TABLES
                    </div>
                    <div style = { { display: "flex", flexDirection : "row", alignItems: "center"} }>
                    <ArrowClockwise />
                        <Button onClick={addUser}>
                            Verify User
                        </Button>
                    </div>
                </div>
            <DataGrid
                getRowId={(row) => row.id}
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={onSelect}
            />
            </Col>
            <Col></Col>
            
        </Row>
    </Container>
    </>)
}

export default CoachApplication