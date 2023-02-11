import React, { useEffect, useState } from "react"
import { Container } from 'react-bootstrap'
import { useParams } from "react-router"
import styled from 'styled-components'
import axios from 'axios'

import { ActionPlanProvider } from "../Context"
import ActionPlanDropDown from "./ActionPlanDropDown"
import ActionPlanForm from "./ActionPlanForm"

const Breadcrump = styled.p`
display: flex;
color: grey;
margin-top: 3%;
`

const DefaultContainer = styled.div`
    margin-top: 5%;
`

const CreateActionPlan = () => {
    const { id } = useParams()
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
                <b className="mx-2"> Action Plan </b>
            </Breadcrump>

            <DefaultContainer className="primary-font-color">
                <h2 className="font-weight-bold mb-4">Action Plan</h2>

                <ActionPlanProvider>
                    <ActionPlanDropDown userid={id} />
                    <ActionPlanForm userid={id} />
                </ActionPlanProvider>
            </DefaultContainer>
        </Container>
    )
}

export default CreateActionPlan