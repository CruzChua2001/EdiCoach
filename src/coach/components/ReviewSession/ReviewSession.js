import React, { useEffect, useState } from 'react'
import { useParams } from "react-router"
import axios from 'axios'
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
    const { id, bookingid } = useParams();
    const [bookingDetails, setBookingDetails] = useState({"Date": ""})
    const [video, setVideo] = useState(false)

    useEffect(_ => {
        axios.get("https://q4xlyhs9l1.execute-api.ap-southeast-1.amazonaws.com/prod/booking_bookingid/" + bookingid)
        .then(res => {
            const data = res.data.Items[0]
            let obj = {}
            obj["Date"] = data["StartDateTime"]["S"]
            setBookingDetails(obj)
        })
    }, [])

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
                <ClientInformation userid={id} bookingDetails={bookingDetails} />
                <br />
                <TranscriptText bookingid={bookingid} />
                <br />

                {video ? 
                    (
                        <a href="#" onClick={() => setVideo(false)}>Click to close the recording</a>
                    )
                    :
                    (
                        <a href="#" onClick={() => setVideo(true)}>Click to view the recording</a>
                    )
                }

                <br />
                
                {video && (
                    <video controls className="w-50 h-50">
                        <source src={"https://booking-recordings.s3.ap-southeast-1.amazonaws.com/recordings/" + bookingid + ".mp4" } />
                    </video>
                )}
                
            </div>
            
        </Container>
    )
}

export default ReviewSession