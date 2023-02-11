import React from "react"
import { useParams } from "react-router"
import styled from "styled-components"
import { Container } from "react-bootstrap"

import ProfileCaseNote from "./ProfileCaseNote"
import ProfileReviewSession from "./ProfileReviewSession"
import ProfileDetails from "./ProfileDetails"
import ProfileActionPlan from "./ProfileActionPlan"

const Breadcrump = styled.p`
    display: flex;
    color: grey;
    margin-top: 3%;
`

const ProfileContainer = styled.div`
    margin-top: 5%;
    display: flex;
`

const LeftProfile = styled.div`
    width: 30%;
`

const RightProfile = styled.div`
    width: 70%;
`

const ClientDetail = () => {
    const { id } = useParams();

    return (
        <Container>
            <Breadcrump>
                <a href="/coach/appointment" className="me-2 text-decoration-none text-secondary"> Home </a>
                /
                <a href="/coach/client" className="mx-2 text-decoration-none text-secondary"> Client </a>
                /
                <b className="mx-2"> Profile </b>
            </Breadcrump>

            <ProfileContainer>
                <LeftProfile>

                    <ProfileCaseNote userid={id} />    

                    <ProfileReviewSession userid={id} />

                    <ProfileActionPlan userid={id} />
                </LeftProfile>
                <RightProfile>
                    <ProfileDetails userid={id} />
                </RightProfile>
            </ProfileContainer>
        </Container>
    )
}

export default ClientDetail