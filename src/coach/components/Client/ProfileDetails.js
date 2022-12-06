import styled from 'styled-components'
import React from "react";
import { Dropdown } from "react-bootstrap";

const Header = styled.p`
    font-size: 14px;
    color: grey;
`

const ProfileDetails = () => {
    return (
        <div className="px-5">
            <div className="justify-content-between d-flex">
                <h1>Client Profile</h1>
                <Dropdown className="py-2">
                    <Dropdown.Toggle>
                        Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Create Case Note</Dropdown.Item>
                        <Dropdown.Item href="/coach/client/actionplan/asd">Create Action Plan</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
            <div className="mt-3">
                <Header>BASIC INFORMATION</Header>

                <div className="row">
                    <div className="col-6">
                        <h5>First Name</h5>
                        <p>Cruz</p>
                    </div>
                    <div className="col-6">
                        <h5>Last Name</h5>
                        <p>Chua</p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        <h5>Gender</h5>
                        <p>Male</p>
                    </div>
                    <div className="col-6">
                        <h5>Date of Birth</h5>
                        <p>18 February 2001</p>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <Header>Contact Information</Header>

                <div className="row">
                    <div className="col-6">
                        <h5>Email</h5>
                        <p>cruzchua@gmail.com</p>
                    </div>
                    <div className="col-6">
                        <h5>Phone</h5>
                        <p>+65 92839182</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails