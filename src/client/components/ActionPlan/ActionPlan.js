import React from "react"
import { Container } from "react-bootstrap";
import ActionPlanContainer from "./ActionPlanContainer";
import { ActionPlanProvider } from "../Context"

const ClientActionPlan = () => {
    let client = "bc@gmail.com"

    return (
        <Container>
            <h2>Action Plan</h2>

            <hr className="border border-dark" />

            <ActionPlanProvider client={client}>
                <ActionPlanContainer />
            </ActionPlanProvider>

        </Container>
    )
}

export default ClientActionPlan