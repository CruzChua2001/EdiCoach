import axios from 'axios';
import React from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';

import { useCasenote } from '../Context'

const Header = styled.p`
    font-size: 14px;
    color: grey;
`

const QuestionDiv = styled.div`
    margin-top: 2%;
`

const SessionInformation = (props) => {

    let caseNoteContext = useCasenote();

    const updateReason = (e) => {
        const value = e.target.value
        setInformation("Reason", value)
    }

    const updateDiscussion = (e) => {
        const value = e.target.value
        setInformation("Discussion", value)
    }

    const updateActionPlan = (e) => {
        const value = e.target.value
        setInformation("ActionPlan", value)
    }

    const setInformation = (key, value) => {
        let tmp = {...caseNoteContext.information}
        tmp[key] = value
        caseNoteContext.setInformation(tmp)
    }

    const submitCaseNote = () => {
        let data = {
            "id": uuidv4(),
            "coach": props.sessionData.userid,
            "client": caseNoteContext.details.UserId,
            "date": caseNoteContext.details.Date,
            "reason": caseNoteContext.information.Reason,
            "discussion": caseNoteContext.information.Discussion,
            "actionplan": caseNoteContext.information.ActionPlan
        }

        const url = "https://d5btr8maz5.execute-api.ap-southeast-1.amazonaws.com/prod/casenote"
        axios.put(url, JSON.stringify(data))
        .then(res => {
            window.location.href="/coach/client/" + caseNoteContext.details.UserId
        })
    }

    return (
        <>
            <Header className="mt-4">Session Information</Header>

            <QuestionDiv>
                <b>Reason of Session: </b>
                <Form.Control as="textarea" onChange={updateReason} value={caseNoteContext.information.Reason} />
            </QuestionDiv>

            <QuestionDiv>
                <b>Discussion: </b>
                <Form.Control as="textarea" onChange={updateDiscussion} value={caseNoteContext.information.Discussion} />
            </QuestionDiv>

            <QuestionDiv>
                <b>Action Plan: </b>
                <Form.Control as="textarea" onChange={updateActionPlan} value={caseNoteContext.information.ActionPlan} />
            </QuestionDiv>

            <Button 
                className="float-end mt-3"
                disabled={(caseNoteContext.information.Reason === "" || caseNoteContext.information.Discussion === "" || caseNoteContext.information.ActionPlan === "") ? true : false}    
                onClick={submitCaseNote}
            >
                Submit
            </Button>
            <Button className="float-end mt-3 me-2" variant={"danger"}>Cancel</Button>
        </>
    )
}

export default SessionInformation