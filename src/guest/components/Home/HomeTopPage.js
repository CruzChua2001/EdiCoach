import React from "react";
import styled from 'styled-components'
import { Button } from 'react-bootstrap'

const Div = styled.div`
    margin-top: 17%;

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

                <a href="/guest/login"><Button variant="" size="lg" className="rounded" style={{ border: "2px solid #3E468A" }}> Login </Button></a>
            </div>
            <div className="col-5">
                
            </div>
        </Div>
    ) 
}

export default HomeTopPage