import React from 'react'
import styled from "styled-components"
import { Container } from "react-bootstrap"
import { Dropdown } from "react-bootstrap";

import TranscriptText from './TranscriptText';
import ClientInformation from './ClientInformation';

const Breadcrump = styled.p`
    display: flex;
    color: grey;
    margin-top: 3%;
`

const ReviewSession = () => {
    return (
        <Container>
            <Breadcrump>
                <a href="/coach/appointment" className="me-2 text-decoration-none text-secondary"> Home </a>
                /
                <a href="/coach/client" className="mx-2 text-decoration-none text-secondary"> Client </a>
                /
                <a href="/coach/client" className="mx-2 text-decoration-none text-secondary"> Profile </a>
                /
                <b className="mx-2"> Review Session </b>
            </Breadcrump>

            <div className="d-flex">
                <h1>Review Session</h1>

                <Dropdown className="reviewSessionAction float-end py-2">
                    <Dropdown.Toggle>
                        Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Add to Case Note</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Print</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Favourite</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="mt-4">
                <ClientInformation />
                <br />
                <TranscriptText />
                <br />

                <a href="">Click to view the recording</a>
            </div>
            
        </Container>
    )
}

export default ReviewSession