import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const QuestionDiv = styled.div`
    margin-top: 2%;
`

const Header = styled.p`
    font-size: 14px;
    color: grey;
`

const SessionInformationView = (props) => {

    const [information, setInformation] = useState({"Reason": "", "Discussion": "", "ActionPlan": ""})

    useEffect(_ => {
        axios.get("https://d5btr8maz5.execute-api.ap-southeast-1.amazonaws.com/prod/casenote/" + props.casenoteid)
        .then(res => {
            const data = res.data.Items[0]
            let obj = {}
            obj["Reason"] = data["reason"]["S"]
            obj["Discussion"] = data["discussion"]["S"]
            obj["ActionPlan"] = data["actionplan"]["S"]
            setInformation(obj)
        })
    })

    return (
        <>
            <Header className="mt-4">Session Information</Header>

            <QuestionDiv>
                <b>Reason of Session: </b> <br />
                {information.Reason}
            </QuestionDiv>

            <QuestionDiv>
                <b>Discussion: </b> <br />
                {information.Discussion}
            </QuestionDiv>

            <QuestionDiv>
                <b>Action Plan: </b> <br />
                {information.ActionPlan}
            </QuestionDiv>
        </>
    )
}

export default SessionInformationView