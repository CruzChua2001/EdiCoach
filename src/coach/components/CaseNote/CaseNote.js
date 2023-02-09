import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from "react-router"
import styled from 'styled-components'

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

    return (
        <Container>
            <Breadcrump>
                <a href="/coach/appointment" className="mx-2 text-decoration-none text-secondary"> Home </a>
                /
                <a href="coach/client" className="mx-2 text-decoration-none text-secondary"> Client </a>
                /
                <a href="coach/client" className="mx-2 text-decoration-none text-secondary"> Name </a>
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