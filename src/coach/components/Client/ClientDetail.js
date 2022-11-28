import React from "react"
import { useParams } from "react-router"
import styled from "styled-components"

const Breadcrump = styled.p`
    display: flex;
    color: grey;
    margin-top: 3%;
    margin-left: 6%;
`

const ClientDetail = () => {
    const { id } = useParams();

    return (
        <>
            <Breadcrump>
                <a href="/coach/appointment" className="mr-2 text-decoration-none text-secondary"> Home </a>
                /
                <a href="/coach/client" className="ml-2 mr-2 text-decoration-none text-secondary"> Client </a>
                /
                <b className="ml-2"> Profile </b>
            </Breadcrump>
        </>
    )
}

export default ClientDetail