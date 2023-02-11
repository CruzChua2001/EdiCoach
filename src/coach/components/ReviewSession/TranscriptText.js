import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import axios from 'axios'
import { Button, Spinner } from 'react-bootstrap'

const Header = styled.span`
    color: grey;
`

const TranscriptText = (props) => {
    const [text, setText] = useState("")
    const [analysedText, setAnalysedText] = useState({})
    const [textAnalysis, setTextAnalysis] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(_ => {
        let url = "https://umt9ds51i4.execute-api.ap-southeast-1.amazonaws.com/prod/reviewsessions"

        axios.post(url, JSON.stringify({"bookingid": props.bookingid}))
        .then(res => {
            console.log(res)
            setText(res["data"])
        })

    }, [])

    const analyseText = async () => {
        setLoading(true)
        //Split the text
        const textSplit = text.split(".")
        //Loop the array text
        let check = 0
        let sentenceForAnalayse = ""
        for (let i=0; i<textSplit.length; i++) {
            sentenceForAnalayse += textSplit[i] + "."
            check++
            if(check == 3) {
                check = 0
                let data = {"text": sentenceForAnalayse}
                let apiCall = await fetch("https://umt9ds51i4.execute-api.ap-southeast-1.amazonaws.com/prod/analyse", {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                let response = await apiCall.json()
                let tmp = {...analysedText, ...response}
                setAnalysedText(temp => {return {...temp, ...response}})
                sentenceForAnalayse = ""
            }
        }
        getItemFormat()
    }

    const getItemFormat = () => {
        setLoading(false)
        setTextAnalysis(text.split(" "))
    }

    const formatItem = (item) => {
        const textResult = analysedText[item]
        if(textResult == "POSITIVE") {
            return (<span className="positiveText">{item}</span>)
        }
        if(textResult == "NEGATIVE") {
            return (<span className="negativeText">{item}</span>)
        }
        if(textResult == "MIXED") {
            return (<span className="mixedText">{item}</span>)
        }
        return (<>{item}</>)
    }

    return (
        <>
            <Header>Transcript</Header> 
            {textAnalysis.length == 0 && (
            <Button onClick={analyseText} className="ms-2 me-2">
                Analyse
                {loading && (
                    <Spinner size="sm" className="ms-2" />
                )}
            </Button>
            )}
            {textAnalysis.length == 0 && (
                <div className="mt-2">
                    {text}
                </div>
            )}

            {textAnalysis.length != 0 && (
                <div className="mt-2">
                    <Header>Text Analysis Result</Header>
                    <br />
                    <div className="p-3 mt-2 w-50 rounded shadow border-2">
                        <p>Emotions</p>
                        <div className="d-flex">
                            <div id="positiveLegend"></div>
                            <span id="positiveTextLegend">Positive</span>
                        </div>

                        <div className="d-flex">
                            <div id="negativeLegend"></div>
                            <span id="negativeTextLegend">Negative</span>
                        </div>

                        <div className="d-flex">
                            <div id="mixedLegend"></div>
                            <span id="mixedTextLegend">Mixed</span>
                        </div>
                    </div>

                    <div className="mt-2 transcribeText">
                        {textAnalysis.map((item, index) => (
                            <span key={index} className="me-1">{formatItem(item)}</span>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default TranscriptText