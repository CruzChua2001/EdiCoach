import React, {useEffect, useState, useContext} from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from "react-router"
import styled from 'styled-components'

import { CaseNoteProvider } from '../Context'
import SessionDetails from './SessionDetails'
import SessionInformation from './SessionInformation'
import { AccountContext } from "../../../Account";
import axios from 'axios'

const Breadcrump = styled.p`
    display: flex;
    color: grey;
    margin-top: 3%;
`

const DefaultContainer = styled.div`
    margin-top: 5%;
`

const CreateCaseNote = () => {
    const { id } = useParams()
    const { getSession, getData } = useContext(AccountContext)
    const [sessionData, setSessionData] = useState({})
    const [name, setName] = useState("")

    useEffect(() => {
        getData()
        .then((session) => {
            const result = formatSessionData(session)
            setSessionData(result)
        })
        .catch((err) => console.log(err));

        const formatSessionData = (session) => {
            let obj = {}
            obj["userid"] = session[1]["Value"]
            return obj
        }

        axios.get("https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/get/" + id)
        .then(res => {
            console.log(res)
            const data = res.data[0]
            setName(data["firstname"]["S"] + " " + data["lastname"]["S"])
        })
    }, []);

    return (
        <Container>
            <Breadcrump>
                <a href="/coach" className="mx-2 text-decoration-none text-secondary"> Home </a>
                /
                <a href="/coach/client" className="mx-2 text-decoration-none text-secondary"> Client </a>
                /
                <a href={"/coach/client/" + id} className="mx-2 text-decoration-none text-secondary"> {name} </a>
                /
                <b className="mx-2"> Create Case Note </b>
            </Breadcrump>

            <DefaultContainer className="primary-font-color">
                <h2 className="font-weight-bold mb-4">Case Note</h2>

                <CaseNoteProvider>
                    <SessionDetails userid={id} />
                    <SessionInformation sessionData={sessionData} userid={id} />
                </CaseNoteProvider>
            </DefaultContainer>
        </Container>
    )
}

export default CreateCaseNote