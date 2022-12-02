import React, { useState } from "react"
import { Button, Form, Dropdown } from "react-bootstrap";
import { PlusCircle, XCircle } from "react-bootstrap-icons";
import { useActionPlan } from "../Context"
import { v4 as uuidv4 } from 'uuid';
import FileInput from "./FileInput";


const Paragraph = () => {
    return (
        <Form.Control as="textarea" placeholder="Long-answer text" disabled={true} />
    )
}

const ShortAnswer = () => {
    return (
        <Form.Control type="text" placeholder="Short answer text" disabled={true} maxLength={50} />
    )
}

// const MultipleChoiceInput = () => {
//     return (
//         <Form.Check disabled type={'radio'} label={<Form.Control type="text" placeholder="Option 1" className="border-bottom border-top-0 border-left-0 border-right-0" />} />
//     )
// }

// const MultipleChoice = () => {
//     const [question, setQuestion] = useState([{id: uuidv4(), option: <MultipleChoiceInput />}])

//     return (
//         <>
//         </>
//     )

// }


const ActionPlanForm = () => {
    const actionPlanContext = useActionPlan();
    
    const [form, setForm] = useState([])
    const [formType, setFormType] = useState([
        {"Paragraph": <Paragraph />}, 
        {"Short Answer": <ShortAnswer />},
        {"File Upload": <FileInput disabled={true} />}
        //{"Multiple Choice": <MultipleChoice />}
    ])

    const addDivider = () => {
        let uuid = uuidv4();
        let GroupId = uuidv4()
        setForm(temp => [...temp, { "id": GroupId, "Group": "", "Questions": [{ "id": uuid, "Question": "", "QuestionType": "Paragraph", "Answer": [] }] }])
    }

    const setGroup = (e) => {
        setForm(temp => temp.map(item => {
            if(item.id == e.target.id) {
                return {...item, Group: e.target.value}
            }
            else {
                return item
            }
        }))
    }

    const setQuestion = (e) => {
        let temp = form.map(temp => {
            if(temp.Questions.filter(ques => ques.id == e.target.id)){
                let tmp = temp.Questions.map(ques => {
                    if(ques.id == e.target.id) {
                        ques = {...ques, "Question": e.target.value}
                        return ques
                    }
                    else{
                        return ques
                    }
                })
                return {...temp, "Questions": tmp}
            }
            else{
                return temp
            }
        })

        setForm(temp)
    }

    const removeSection = (groupId) => {
        let temp = form.filter(item => item.id != groupId)
        setForm(temp)
    }

    const addQuestion = (e) => {
        let uuid = uuidv4();
        let temp = form.map(temp => {
            if(e.target.dataset.groupId == temp.id) {
                let questions = [...temp.Questions, {"id": uuid, "Question": "", "QuestionType": "Paragraph", "Answer": [] }]
                return {...temp, Questions: questions}
            }

            return temp
        })

        setForm(temp)
    }

    const removeQuestion = (quesId) => {
        let temp = form.map(temp => {
            if(temp.Questions.filter(e => e.id == quesId).length > 0) {
                return{...temp, Questions: temp.Questions.filter(e => e.id != quesId)}
            }
            else {
                return temp
            }
        })
        setForm(temp)
    }

    const setQuestionType = (questionType, quesId) => {
        let temp = form.map(temp => {
            if(temp.Questions.filter(ques => ques.id == quesId).length > 0){
                let tmp = temp.Questions.map(ques => {
                    if(ques.id == quesId) {
                        console.log(questionType)
                        return {...ques, QuestionType: questionType}
                    }
                    else {
                        return ques
                    }
                })
                return {...temp, Questions: tmp}
            }
            else {
                return temp
            }
        })

        setForm(temp)
    }

    const submitActionPlan = (e) => {
        let uuid = uuidv4()
        fetch('https://6i1lbzm98l.execute-api.us-east-1.amazonaws.com/uat/actionplan', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"id": uuid, "client": "bc@gmail.com", "coach": "abc@gmail.com","form": form})
        })
        .then(response => console.log(response))
    }

    return (
        <div>
            <b style={{ textDecoration: "underline" }}>General Information</b>
            <br />
            <div className="mt-3 mb-2">
               {form.map((item) => (
                   <div className="my-2" key={item.id}>
                       <div className="d-flex mb-2">
                           <div className="w-75">
                                <Form.Control type="text" placeholder="Enter section here" value={item.Group} onChange={setGroup} id={item.id} />
                           </div>
                            <div className="w-25">
                                <Button className="float-right" variant="danger" onClick={() => removeSection(item.id)}> <XCircle className="mb-1" /> Remove Section</Button>
                            </div>
                       </div>
                       <div className="shadow border rounded p-4">
                       {item.Questions.map(ques => (
                           <div key={ques.id} className="mt-5">
                                <div className="d-flex">
                                    <div className="w-75">
                                        <Form.Control type="text" placeholder="Enter question here" value={ques.Question} onChange={setQuestion} id={ques.id} />
                                    </div>
                                    <div className="w-25">
                                        {item.Questions.length > 1 && 
                                            <Button className="float-right" variant="danger" onClick={() => removeQuestion(ques.id)}> <XCircle className="mb-1" /> Remove Question</Button>
                                        }
                                    </div>
                                </div>
                               
                           
                                <div className="d-flex mt-2">
                                    <div className="w-50">
                                        {formType.map((item, index) => {
                                            if(Object.keys(item) == ques.QuestionType) {
                                                return ( 
                                                    <div key={index}>
                                                        {Object.values(item)}
                                                    </div> 
                                                )
                                            }
                                        })}
                                    </div>

                                    <div className="w-50">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" className="float-right rounded border px-4 py-2" style={{ fontSize: "18px" }}>
                                                {ques.QuestionType}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {formType.map((item, index) => (
                                                    <Dropdown.Item key={index} disabled={Object.keys(item) == ques.QuestionType} onClick={() => setQuestionType(Object.keys(item)[0], ques.id)}>{Object.keys(item)}</Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                           </div>

                       ))}
                       <Button variant="primary" className="mt-3 mb-4 border rounded" data-group-id={item.id} onClick={addQuestion} ><PlusCircle className="pb-1" size={18} /> Add Question </Button>
                    </div>
                        
                   </div>
               ))}
            </div>
            <Button variant="" className="mt-2 border rounded" onClick={addDivider}><PlusCircle className="pb-1" size={18} /> Add Section </Button>
            <Button className="mt-2 float-right" onClick={submitActionPlan}>Submit</Button>
            <Button className="mt-2 float-right" variant={'danger'}>Cancel</Button>
        </div>
    )
}

export default ActionPlanForm