import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Container} from 'react-bootstrap'
import { useParams } from "react-router"
import styled from 'styled-components'

import GeneralInformation from './GeneralInformation'
import ActionPlanView from './ActionPlanView'

const Breadcrump = styled.p`
display: flex;
color: grey;
margin-top: 3%;
`

const DefaultContainer = styled.div`
    margin-top: 5%;
`

const ActionPlan = () => {
    const { id, actionplanid } = useParams()
    const [actionPlan, setActionPlan] = useState({"date": "", "form": []})
    const [name, setName] = useState("")

    useEffect(_ => {
        let url = "https://en3gq3zwt3.execute-api.ap-southeast-1.amazonaws.com/prod/actionplan" + "?id=" + actionplanid
        axios.get(url)
        .then(res => {
            const data = res.data[0]
            console.log(data)
            setActionPlan(data)
        })

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

                <GeneralInformation userid={id} actionPlan={actionPlan} />
                <ActionPlanView actionPlan={actionPlan} />
            </DefaultContainer>
        </Container>
    )
}

export default ActionPlan