import React from 'react'
import styled from 'styled-components'

const Header = styled.span`
    color: grey;
`

const ActionPlanView = (props) => {

    const getAnswer = ques => {
        if(ques.QuestionType == "File Upload") {
            return (
                <>
                {ques.Answer.map((item, index) => (
                    <div key={index}>
                        <a href={"https://actionplanfiles.s3.ap-southeast-1.amazonaws.com/" + item}>Document #{index+1}</a>
                    </div>
                ))}
                </>    
            )
        }
        return (
            <p>{ques.Answer}</p>
        )
    }

    return (
        <>
            {props.actionPlan.form.map((item, i) => (
                <div key={i} className="mt-3">
                    <Header>{item.Group}</Header>
                    {item.Questions.map((ques, j) => (
                        <div key={j}>
                            <b>{ques.Question}</b>
                            {getAnswer(ques)}
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

export default ActionPlanView