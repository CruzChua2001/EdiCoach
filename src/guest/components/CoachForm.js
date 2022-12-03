import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import 'C:/Users/ashle/Documents/Application Security & Project/EdiCoach/static/gueststyle.css';
import { SortNumericDown } from "react-bootstrap-icons";
import { Message } from "@mui/icons-material";

const CoachForm = () => {
    const FormStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      };

    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    
    const deleteTag = (index) => {
        //setTags(prevState => prevState.filter((tag, i) => i !== index))
        setForms(prevState => {
          console.log(prevState.Skills[index], index)
          return {...prevState, Skills: prevState.Skills.filter(temp => temp != prevState.Skills[index])}
        })
      }

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
      };

      const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
      
        if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
          e.preventDefault();
          setForms(prevState => {
            return {...prevState, Skills: [...prevState.Skills, trimmedInput]}
          })
          setInput('');
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            // const tagsCopy = [...tags];
            // const poppedTag = tagsCopy.pop();
            // e.preventDefault();
            // setTags(tagsCopy);
            // setInput(poppedTag);
            setForms(prevState => {
              return {...prevState, Skills: prevState.Skills.pop()}
            })
          }
      
        setIsKeyReleased(false);
      };
      
      const onKeyUp = () => {
        setIsKeyReleased(true);
      }

      const [Forms, setForms] = useState({
        FirstName: "",
        LastName : "",
        Email : "",
        Phone : "",
        DateofBirth : "",
        Gender: "",
        HashPassword: "",
        userType: "Coach",
        Salt: "",
        Skills: []
     })

     const coachRegister = () => {
        console.log('test')
        let Salt = bcrypt.genSaltSync(10);
        fetch("https://vonlxpnb0j.execute-api.us-east-1.amazonaws.com/UAT/postcoachapplication", {
            method: 'POST',
            body: JSON.stringify({...Forms, Salt : Salt, HashPassword: bcrypt.hashSync(Forms.HashPassword, Salt)}),
            headers: { 'Content-Type': 'application/json' }})
            .then(msg => {window.location.href = "/guest/sign-up";}     
            //     (msg) => {
            //         if (msg.HTTPStatusCode === 200) {
        
            //             window.location.href = "/guest/sign-up";
                        
            //         } else {
            //             document.getElementById("errorMessage").innerText = msg.message;
            //         };
            // }
            ).catch(err => console.log(err))
            // console.log('hi') 
    }
    
    return (<>
        <div style={FormStyle} >
            <div class="shadow p-5 mb-5 bg-white rounded">
            <p className="font-weight-bold">Personal Details</p>
                    <div class="row">
                            <div class="col">
                                <Form.Group className="mb-3" controlId="FirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" value={Forms.FirstName} onChange={(e) => setForms({...Forms, FirstName: e.target.value})}/>
                                </Form.Group>
                            </div>
                            <div class="col">
                                <Form.Group className="mb-3" controlId="LastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" value={Forms.LastName} onChange={(e) => setForms({...Forms, LastName: e.target.value})}/>
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="SignUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={Forms.Email} onChange={(e) => setForms({...Forms, Email: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="PhoneNumber">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="email" placeholder="Enter Phone Number" value={Forms.Phone} onChange={(e) => setForms({...Forms, Phone: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="DOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" placeholder="DD/MM/YYYY" value={Forms.DateofBirth} onChange={(e) => setForms({...Forms, DateofBirth: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Gender">
                        <Form.Label>Gender</Form.Label>
                            <Form.Control type="text" id="gender" placeholder="Enter gender" value={Forms.Gender} onChange={(e) => setForms({...Forms, Gender: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="SignUpPassword" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" placeholder="Password" value={Forms.HashPassword} onChange={(e) => setForms({...Forms, HashPassword: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <hr />
                        <p className="font-weight-bold">Enter Relevant Skills</p>
                        <input id="inputTag"
                                value={input}
                                placeholder="Enter a tag"
                                onKeyDown={onKeyDown}
                                onKeyUp={onKeyUp}
                                onChange={onChange}
                            />
                        <div className="container">
                            {Forms.Skills.map((tag, index) => ( <div className="tag">{tag}
                            <button onClick={() => deleteTag(index)}>x</button>
                            </div>))}
                        </div>
                        <Button variant="primary" onClick={coachRegister}>Sign Up</Button>

            </div>
        </div>
    </>)
}

export default CoachForm
