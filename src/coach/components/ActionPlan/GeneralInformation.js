import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from "styled-components"

const Header = styled.span`
    color: grey;
`

const GeneralInformation = (props) => {
    const [userInfo, setUserInfo] = useState({"Name": "", "Phone": ""})

    useEffect(_ => {
        axios.get("https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/get/" + props.userid)
        .then(res => {
            const data = res.data[0]
            let obj = {}
            obj["Name"] = data["firstname"]["S"] + " " + data["lastname"]["S"]
            obj["Phone"] = data["phone"]["S"]
            setUserInfo(obj)
        })
    }, [])

    return (
        <>
            <Header>Session Information</Header>
            <div className="w-50">
                <div className="row">
                    <div className="col-6">
                        <b>Client Name:</b>
                    </div>
                    <div className="col-6">
                        <span>
                            {userInfo.Name}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <b>Client No:</b>
                    </div>
                    <div className="col-6">
                        <span>
                        {userInfo.Phone}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <b>Date Modified:</b>
                    </div>
                    <div className="col-6">
                        <span>
                            {props.actionPlan.date}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeneralInformation