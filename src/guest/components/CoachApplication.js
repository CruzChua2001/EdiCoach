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

const CoachApplication = () => {

    const [rows, setRows] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    let columns = [
        {
          field: 'fullName',
          headerName: 'Full name',
          width: 250
        },
        { field: 'email', headerName: 'Email', width: 250 },
      ];

    
    
    useEffect(()=>{
        const retrieveUsers = () => {
            fetch("https://vonlxpnb0j.execute-api.us-east-1.amazonaws.com/UAT/postcoachapplication", {
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
                                fullName : `${coach.FirstName} ${coach.LastName}`,
                                email : coach.Email,
                            }
                        })
                    );
                });   
                }).catch(err => console.log(err))
            }
            retrieveUsers()

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

    // const deleteUser = () => {
    //     let email = selectedUser;
    //     console.log(email);
    //     fetch(`https://vonlxpnb0j.execute-api.us-east-1.amazonaws.com/UAT/postcoachapplication/delete`+email, {
    //     method: 'DELETE',
    //     headers: { 'Content-Type': 'application/json' }})
    //     .then((msg) => {
    //         msg.json()
    //         .then(users => {
    //             console.log(users)
    //             retrieveUsers();
    //             closeAdd();
    //         });
            
            
    //     }).catch(err => console.log(err))
    // }

    return (<>
            
    <Container className="admin-table" style={{paddingBottom: "10%"}}>
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
                            <Dropdown.Item>Delele User</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">View Details</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                </div>
            <DataGrid
                getRowId={(row) => row.id}
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            </Col>
            <Col></Col>
        </Row>
    </Container>
    </>)
}

export default CoachApplication