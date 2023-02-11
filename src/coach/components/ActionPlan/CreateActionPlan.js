import React from "react"
import { useParams } from "react-router"
import styled from 'styled-components'

import { ActionPlanProvider } from "../Context"
import ActionPlanDropDown from "./ActionPlanDropDown"
import ActionPlanForm from "./ActionPlanForm"

const Breadcrump = styled.p`
    display: flex;
    color: grey;
    margin-top: 3%;
    margin-left: 6%;
`

const DefaultContainer = styled.div`
    margin-top: 3%;
    margin-inline: 8%;
`

const CreateActionPlan = () => {
    const { id } = useParams()
    return (
        <>
            <Breadcrump>
                <a href="/coach/appointment" className="mx-2 text-decoration-none text-secondary"> Home </a>
                /
                <a href="coach/client" className="mx-2 text-decoration-none text-secondary"> Client </a>
                /
                <a href="coach/client" className="mx-2 text-decoration-none text-secondary"> Name </a>
                /
                <b className="mx-2"> Action Plan </b>
            </Breadcrump>

            <DefaultContainer className="primary-font-color">
                <h2 className="font-weight-bold mb-4">Action Plan</h2>

                <ActionPlanProvider>
                    <ActionPlanDropDown />
                    <ActionPlanForm />
                </ActionPlanProvider>
            </DefaultContainer>
        </>
    )
}

export default CreateActionPlan