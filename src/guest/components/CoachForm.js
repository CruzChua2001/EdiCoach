import React, { useState } from "react";
import { Form, Button, Dropdown } from 'react-bootstrap';
import 'C:/Users/ashle/Documents/Application Security & Project/EdiCoach/static/gueststyle.css';

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
        DateOfBirth : "",
        Skills: []
     })
    
    return (<>
        <div style={FormStyle} >
            <div class="shadow p-5 mb-5 bg-white rounded">
            <p className="font-weight-bold">Personal Details</p>
                    <div class="row">
                            <div class="col">
                                <Form.Group className="mb-3" controlId="FirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" />
                                </Form.Group>
                            </div>
                            <div class="col">
                                <Form.Group className="mb-3" controlId="LastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="SignUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="PhoneNumber">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Phone Number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="DOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" placeholder="DD/MM/YYYY" />
                        </Form.Group>
                        <hr />
                        <p className="font-weight-bold">Enter Relevant Skills</p>
                        <div className="container">
                        {Forms.Skills.map((tag, index) => ( <div className="tag">{tag}
                        <button onClick={() => deleteTag(index)}>x</button>
                        </div>))}
                            <input
                                value={input}
                                placeholder="Enter a tag"
                                onKeyDown={onKeyDown}
                                onKeyUp={onKeyUp}
                                onChange={onChange}
                            />
                        </div>
                        <Button variant="primary" type="submit">Sign Up</Button>

            </div>
        </div>
    </>)
}

export default CoachForm