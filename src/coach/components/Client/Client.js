import React from "react"
import styled from "styled-components"

import SearchClient from "./SearchClient"
import AllClients from "./AllClients"
import { AllClient } from "../Context"
import { Container } from "react-bootstrap"

const Breadcrump = styled.p`
    display: flex;
    color: grey;
    margin-top: 3%;
`

const ClientContainer = styled.div`
    margin-top: 3%;
`

const Client = () => {
    return (
        <Container>
            <Breadcrump>
                <a href="/coach" className="mx-2 text-decoration-none text-secondary"> Home </a>
                /
                <b className="mx-2"> Clients </b>
            </Breadcrump>

            <AllClient>
                <SearchClient />
                <ClientContainer>
                    <AllClients />
                </ClientContainer>
            </AllClient>
        </Container>
    )
}

export default Client