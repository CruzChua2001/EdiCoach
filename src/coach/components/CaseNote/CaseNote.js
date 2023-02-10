import React, { useEffect, useState } from "react"
import { Container } from 'react-bootstrap'
import { useParams } from "react-router"
import styled from 'styled-components'
import axios from 'axios'

import { CaseNoteProvider } from '../Context'
import SessionDetails from './SessionDetails'
import SessionInformationView from './SessionInformationView'

const Breadcrump = styled.p`
    display: flex;
    color: grey;
    margin-top: 3%;
`

const DefaultContainer = styled.div`
    margin-top: 5%;
`

const CaseNote = () => {
    const { id, casenoteid } = useParams()
    const [name, setName] = useState("")

    useEffect(_ => {
        axios.get("https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/get/" + id)
        .then(res => {
            console.log(res)
            const data = res.data[0]
            setName(data["firstname"]["S"] + " " + data["lastname"]["S"])
        })
    }, [])

    return (
        <Container>
            <Breadcrump>
                <a href="/coach" className="mx-2 text-decoration-none text-secondary"> Home </a>
                /
                <a href="/coach/client" className="mx-2 text-decoration-none text-secondary"> Client </a>
                /
                <a href={"/coach/client/" + id} className="mx-2 text-decoration-none text-secondary"> {name} </a>
                /
                <b className="mx-2"> View Case Note </b>
            </Breadcrump>

            <DefaultContainer className="primary-font-color">
                <h2 className="font-weight-bold mb-4">Case Note</h2>

                <CaseNoteProvider>
                    <SessionDetails userid={id} />
                    <SessionInformationView casenoteid={casenoteid} />
                </CaseNoteProvider>
            </DefaultContainer>
        </Container>
    )
}

export default CaseNote