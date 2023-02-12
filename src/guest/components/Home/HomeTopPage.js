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
        <div className="home-top">
            <div className="row container">
                <div className="col-sm-12 col-md-4">
                    <h1>
                    Communicate
                        <br />
                        Collaborate. Create.
                    </h1>

                    <p>We'll coach you through it</p>

                    <a href="/guest/login"><Button variant="" size="lg" className="rounded" style={{ border: "2px solid #3E468A", zIndex: 99 }}> Login </Button></a>
                </div>
                <div className="mb-3 col-sm-12 col-md-8">
                    <img src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/%E2%80%94Pngtree%E2%80%94patient+counseling_5401409.png" width="400" className="float-end me-5" />
                </div>
            </div>
            
        </div>
    ) 
}

export default HomeTopPage