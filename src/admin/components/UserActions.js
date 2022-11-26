import React, {useEffect, useState, useRef} from "react";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { DataGrid } from '@mui/x-data-grid';

const UserActions = () => {

    const [users, setUsers] = useState([]);

    let columns = [
        {
          field: 'fullName',
          headerName: 'Full name',
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstname || ''} ${params.row.lastname || ''}`,
        },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'dob', headerName: 'DOB', width: 130 },
      ];
    
    let row;

    const retrieveUsers = () => {
        fetch("https://iipemcorb8.execute-api.us-east-1.amazonaws.com/dev/scan", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(users => {
                console.log(users.Items);
                setUsers(users.Items);
            });
            
            
        }).catch(err => console.log(err))
    }

    const addUser = () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let firstname = document.getElementById("firstname").value;;
        let lastname = document.getElementById("lastname").value;;
        let dob = document.getElementById("dob").value;;
        let uuid = uuidv4();
        let usertype = document.getElementById("usertype").value;;

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        fetch("https://iipemcorb8.execute-api.us-east-1.amazonaws.com/dev/add", {
        method: 'POST',
        body: JSON.stringify({email, password: hash, salt, firstname, lastname, dob, uuid, usertype}),
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(users => {
                console.log(users)
            });
            
            
        }).catch(err => console.log(err))
    }

    const deleteUser = () => {
        let email = document.getElementById("deleteEmail").value;
        fetch("https://iipemcorb8.execute-api.us-east-1.amazonaws.com/dev/delete?" + new URLSearchParams({
            email: email
        }), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(users => {
                console.log(users)
            });
            
            
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        var text = "";
        row = [];
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            row.push({ email: element.Email.S, lastname: element.LastName.S, firstname: element.FirstName.S, dob: element.DOB.S })
        }
        console.log(row);
    }, [users])
    

    return (
    <>
    <div>User Actions</div>
    <Container>
        <Row>
            <Col></Col>
            <Col xs="8">
            <Form>
                
                
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
    <Container>
        <Row>
            <Col></Col>
            <Col xs="8">
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
    <div>
        <div>Remove</div>
        <div>
            <form>
                <input type="text" id="deleteEmail" />
                <Button onClick={deleteUser} variant={'primary'}>Get</Button>
            </form>
        </div>
    </div>
    <div>
        <div>List</div>
        <Button onClick={retrieveUsers} variant={'primary'}>Get</Button>
        <div id="test">
        </div>
    </div>
    </>
    )
}

export default UserActions