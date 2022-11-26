import React from "react"
import styled from "styled-components"

import SearchClient from "./SearchClient"
import AllClients from "./AllClients"
import { AllClient } from "./Context"

const Breadcrump = styled.p`
    display: flex;
    color: grey;
    margin-top: 3%;
    margin-left: 6%;
`

const ClientContainer = styled.div`
    margin-top: 3%;
    margin-inline: 6%;
`

const Client = () => {
    return (
        <>
            <Breadcrump>
                <a href="/coach/appointment" className="mr-2 text-decoration-none text-secondary"> Home </a>
                /
                <b className="ml-2"> Client </b>
            </Breadcrump>

            <AllClient>
                <SearchClient />
                <ClientContainer>
                    <AllClients />
                </ClientContainer>
            </AllClient>
        </>
    )
}

export default Client