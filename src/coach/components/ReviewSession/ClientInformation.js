import React from 'react'
import styled from "styled-components"

const Header = styled.span`
    color: grey;
`

const ClientInformation = () => {
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
                            Wye Keong Wee
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <b>Client No:</b>
                    </div>
                    <div className="col-6">
                        <span>
                            931230293
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <b>Date Modified:</b>
                    </div>
                    <div className="col-6">
                        <span>
                            18/11/2022 12:34 PM
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientInformation