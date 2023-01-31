import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import axios from 'axios'

const Header = styled.span`
    color: grey;
`

const TranscriptText = () => {
    const [text, setText] = useState("")

    useEffect(_ => {
        let url = "https://umt9ds51i4.execute-api.ap-southeast-1.amazonaws.com/prod/reviewsessions"

        axios.get(url)
        .then(res => {
            console.log(res)
            setText(res["data"])
        })

    }, [])

    return (
        <>
            <Header>Transcript</Header>
            <div className="mt-2">
                {text}
            </div>
        </>
    )
}

export default TranscriptText