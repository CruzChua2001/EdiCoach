import React, { useState, useRef } from "react";
import { Button, Form, Row, Col } from 'react-bootstrap';
import { MyProgressBar } from "./Personalization/ProgressBar";

const FormStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 110px)',
    maxWidth: '90vw', 
  };

const NUMBER_OF_QUESTIONS = 5;
const QUESTIONS = ["Are you currently employed?", "What field of work are you in?", "What skill(s) are you trying to develop?", "How proficient are you in your current/previous role?", "Any other things you would like to share with us?"]

const Personlization = () => {

    const [questionNumber, setQuestionNumber] = useState(0)
    const [responses, setResponses] = useState({})
    const responseRef = useRef()

    const personalizationAnswers = (temp) => {

        const formatAns = {Email : "joshualim2122@gmail.com", UserType : "Client", Skills: temp}

        fetch("https://vonlxpnb0j.execute-api.us-east-1.amazonaws.com/UAT/clientquestionnaire", {
            method: 'POST',
            body: JSON.stringify(formatAns),
            headers: { 'Content-Type': 'application/json' }})
            .then(msg => {console.log(msg)}     
            ).catch(err => console.log(err))
    }

    const increaseQuestionNumber = () => {
        if(questionNumber >= 4 ){
            //to store value as an object with key value pair in this case stores responses to it's question number
            let temp = {...responses, [questionNumber]: responseRef.current.value}
            setResponses(temp)
            personalizationAnswers(temp)
            return
        }
        setResponses({...responses, [questionNumber]: responseRef.current.value})
        responseRef.current.value = ""
        setQuestionNumber(questionNumber + 1) 
    }

    const decreaseQuestionNumber = () => {
        setQuestionNumber(questionNumber - 1) 
    }

    const lastQuestion = questionNumber === 4
    const firstQuestion = questionNumber === 0

    const submitForm = () => {
        console.log(responses)
    }

    return (<>
     <div style={FormStyle} >
            <Row>
                <Col md={6} style = { {paddingLeft: 150} }>
                    <h1>Getting to know you better...</h1>
                    <h3 style={ {marginTop: 20, marginBottom: 20} }>For each question, write a short description to help us to get to understand your needs and also to know you better!</h3>
                    <MyProgressBar questionNumber={questionNumber} numberOfQuestions={NUMBER_OF_QUESTIONS - 1} />
                    <p style={ {textAlign: "center", marginTop: 20} }>{questionNumber + 1} / {NUMBER_OF_QUESTIONS} questions completed!</p>
                </Col>
                <Col md={6} style = { {paddingRight: 0} }>
                    <div className="shadow p-5 mb-5 bg-white rounded">
                        <Form>                 
                            <Form.Group className="mb-3">
                                <Form.Label></Form.Label>
                                <div>   
                                    {QUESTIONS[questionNumber]}
                                </div>
                                <Form.Control type="text" placeholder="something" ref={responseRef} />
                            </Form.Group>
                            <Button onClick={decreaseQuestionNumber} disabled = {firstQuestion} style= {{backgroundColor: "red"}} >Back</Button>
                            <Button onClick={increaseQuestionNumber} style={ {backgroundColor: (lastQuestion ? "green"  : "blue"), float:"right"} }>{lastQuestion ? "Complete" : "Next"}</Button>
                        </Form>
                        {/*JSON.stringify(responses, null, 2)*/}
                    </div>
                </Col>
            </Row>
        </div>
    </>)
}

export default Personlization