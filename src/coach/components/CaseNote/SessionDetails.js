import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useCasenote } from '../Context'

const Header = styled.p`
    font-size: 14px;
    color: grey;
`

const SessionDetails = (props) => {

    let caseNoteContext = useCasenote();

    useEffect(() => {
        axios.get("https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/get/" + props.userid)
        .then(res => {
            const data = res.data[0]
            let obj = {
                "Name": data["firstname"]["S"] + " " + data["lastname"]["S"],
                "Phone": data["phone"]["S"],
                "Date": getDate(),
                "UserId": data["userid"]["S"]
            }
            caseNoteContext.setDetails(obj)
        })

        const getDate = () => {
            const date = new Date()
            const month = parseInt(date.getMonth()) + 1
            return date.getDate() + "/" + month + "/" + date.getFullYear()
        }
    }, [])

    return (
        <>
            <Header>Session Details</Header>
            <div className="w-50">
                <div className="row">
                    <div className="col-6">
                        <b>Client Name:</b>
                    </div>
                    <div className="col-6">
                        <span>
                            {caseNoteContext.details["Name"]}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <b>Client No:</b>
                    </div>
                    <div className="col-6">
                        <span>
                            {caseNoteContext.details["Phone"]}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <b>Date Modified:</b>
                    </div>
                    <div className="col-6">
                        <span>
                            {caseNoteContext.details["Date"]}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SessionDetails