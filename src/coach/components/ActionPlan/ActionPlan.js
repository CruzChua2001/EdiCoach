import React from "react"
import { useParams } from "react-router"
import styled from 'styled-components'

import { ActionPlanProvider } from "../Context"
import ActionPlanDropDown from "./ActionPlanDropDown"
import ActionPlanVisionGoal from "./ActionPlanVisionGoal"

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

const ActionPlan = () => {
    const { id } = useParams()
    return (
        <>
            <Breadcrump>
                <a href="/coach/appointment" className="mr-2 text-decoration-none text-secondary"> Home </a>
                /
                <a href="coach/client" className="ml-2 mr-2 text-decoration-none text-secondary"> Client </a>
                /
                <a href="coach/client" className="ml-2 mr-2 text-decoration-none text-secondary"> Name </a>
                /
                <b className="ml-2"> Action Plan </b>
            </Breadcrump>

            <DefaultContainer className="primary-font-color">
                <h2 className="font-weight-bold mb-4">Action Plan</h2>

                <ActionPlanProvider>
                    <ActionPlanDropDown />
                    <ActionPlanVisionGoal />
                </ActionPlanProvider>
            </DefaultContainer>
        </>
    )
}

export default ActionPlan