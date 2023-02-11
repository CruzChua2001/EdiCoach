import React from "react";
import styled from 'styled-components'
import { Button } from 'react-bootstrap'

const Div = styled.div`
    margin-inline: 10%;
    margin-top: 15%;
    z-index: 5;
    display: flex;
`

const HomeTopPage = () => {
    return (
        <Div className="row">
            <div className="col-7">
                <h1>
                    Communicate.
                    <br />
                    Collaborate. Create.
                </h1>

                <p>EDICOACH provides an effective and powerful way to manage your lifestyle</p>

                <a href="/guest/login"><Button variant="" size="lg" className="rounded" style={{ border: "2px solid #3E468A", zIndex: 99 }}> Login </Button></a>
            </div>
            <div className="col-5">
                <img src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/%E2%80%94Pngtree%E2%80%94patient+counseling_5401409.png" width="400" />
            </div>
        </Div>
    ) 
}

export default HomeTopPage