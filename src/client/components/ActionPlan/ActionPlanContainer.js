import styled from 'styled-components'
import React, { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { useActionPlan } from "../Context"
import FileInput from './FileInput'
import { Button, Form } from 'react-bootstrap';

const Header = styled.p`
    text-decoration: underline;
    text-shadow: 1px 0 #3E468A;
    letter-spacing: 1px;
    font-weight: bold;
`

const CoachInformation = (props) => {
    const getCoach = (coach) => {
        return {"name": "Lim Xuan Wei", "phone": "92736278"}
    }

    return (
        <>
            <Header>General Information</Header>
            <div className="w-50">
                <div className="row">
                    <div className="col-6">
                        <span>Coach Name:</span>
                    </div>
                    <div className="col-6">
                        <span>{getCoach(props.coach).name}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <span>Coach Email:</span>
                    </div>
                    <div className="col-6">
                        <span>
                            {props.coach}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <span>Coach Contact:</span>
                    </div>
                    <div className="col-6">
                        <span>
                            {getCoach(props.coach).phone}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}


const ActionPlanContainer = () => {

    const actionPlan = useActionPlan();

    const openForm = (id) => {
        document.getElementById(id+"_form").style.display = 'block'
        document.getElementById(id+"_open").style.display = 'none'
        document.getElementById(id+"_close").style.display = 'block'
    }

    const closeForm = (id) => {
        document.getElementById(id+"_form").style.display = 'none'
        document.getElementById(id+"_open").style.display = 'block'
        document.getElementById(id+"_close").style.display = 'none'
    }

    const submitForm = (id) => {
        
        let temp = actionPlan.actionPlan.filter(temp => temp.id == id)[0]
        let empty = 0;
        let allFiles = []

        let newForm = temp.form.map(f => {
            let newAnswers = f.Questions.map(ques => {

                if(ques.QuestionType == "Paragraph" || ques.QuestionType == "Short Answer") {
                    let ans = document.getElementById(ques.id).value

                    if(ans == "") {
                        empty++
                        return ques
                    }

                    return {...ques, Answer: ans}
                }
                else if(ques.QuestionType == "File Upload") {
                    let l = document.getElementById(ques.id).files.length
                    let files = document.getElementById(ques.id).files

                    if(files.length <= 0) {
                        empty++
                        return ques
                    }

                    let fileAns = []
                    for(let i=0; i < l; i++) {
                        fileAns.push(files[i].name)
                        allFiles.push(files[i])
                    }

                    return {...ques, Answer: fileAns}
                }
                else {
                    return ques
                }
                
            })
            return {...f, Questions: newAnswers}
        })

        //use empty for empty

        //console.log(newForm)
        const newTemp = { ...temp, coach: "asn@gmail.com", form: newForm }

        fetch('https://6i1lbzm98l.execute-api.us-east-1.amazonaws.com/uat/actionplan', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newTemp)
        })
        .then(response => {
            console.log(response)
            window.location.href = "/client/actionplan"
        })
    }
    
    const ActionPlanForm = (props) => {
    
        const getAnswer = (question) => {

            if(question.QuestionType == "Paragraph") {
                return (<Form.Control as="textarea" placeholder={question.Answer != "" ? question.Answer : "Enter your answer here"} id={question.id} />)
            }
            else if(question.QuestionType == "Short Answer") {
                return (<Form.Control type="text" placeholder={question.Answer != "" ? question.Answer : "Enter your answer here"} maxLength={50} id={question.id} />)
            }
            else if(question.QuestionType == "File Upload") {
                return (<Form.Control type="file" id={question.id} multiple={true} />)
            }
        }
    
        return (
            <div className="text-left">
                {props.form.map((item, index) => (
                    <div key={index} className="mt-3">
                        <Header>{item.Group}</Header>
                        {item.Questions.map(ques => (
                            <div key={ques.id}>
                                <p>{ques.Question}</p>
                                
                                {getAnswer(ques)} 
    
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    return (
    <div>
        {actionPlan.actionPlan.map((item, index) => (
            <div key={index} className="mt-2">
                <div className="border rounded p-3 d-flex" style={{ backgroundColor: '#E7E7E7' }}>
                    <div className="mt-2 w-75"> 
                        <h2>Career Coaching</h2>
                        <span>3rd December 2022</span>
                    </div>
                        <div className="w-25" id={index+"_open"}>

                            <div className="float-right" style={{float: 'right'}}>
                                <ChevronDown 
                                    size={25}
                                    className="float-right mt-4 mr-3"
                                    style={{ cursor: 'pointer', float: 'right' }}
                                    onClick={() => openForm(index)}
                                />

                            </div>
                        </div>
                        <div className="w-25" id={index+"_close"} style={{ display:'none' }}>
                            <ChevronUp 
                                size={25}
                                className="float-right mt-4 mr-3"
                                style={{ cursor: 'pointer', float: 'right' }}
                                onClick={() => closeForm(index)}
                            />
                        </div>
                </div>

                <div id={index + "_form"} style={{ display: 'none' }} className="border rounded mt-1 p-3">
                    <div className="mt-2">
                        <section className="mb-4">
                            <CoachInformation coach={item.coach} />
                        </section>

                        <section className="text-left">
                            <ActionPlanForm form={item.form} />
                        </section>

                        <section className="mt-5 d-flex justify-content-end">
                            <Button onClick={() => submitForm(item.id)}>Submit Form</Button>
                        </section>
                    </div>
                </div>
            </div>
        ))}
    </div>
    )
}

export default ActionPlanContainer