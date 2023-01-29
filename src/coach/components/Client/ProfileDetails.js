import styled from 'styled-components'
import React, {useState, useEffect} from "react";
import { Dropdown } from "react-bootstrap";
import axios from 'axios';

const Header = styled.p`
    font-size: 14px;
    color: grey;
`

const ProfileDetails = (props) => {
    const [result, setResult] = useState({})

    useEffect(_ => {
        let url = "https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/get/" + props.userid

        axios.get(url)
        .then(res => {
            const details = formatClientData(res['data'])
            console.log(details[0])
            setResult(details[0])
        })

        const formatClientData = (result) => {
            let arr = []
            result.forEach(item => {
                let obj = {}
                obj['dob'] = item['dob']['S']
                obj['firstname'] = item['firstname']['S']
                obj['gender'] = item['gender']['S']
                obj['lastname'] = item['lastname']['S']
                obj['phone'] = item['phone']['S']
                obj['userid'] = item['userid']['S']
                obj['email'] = item['email']['S']
                arr.push(obj)
            })
            return arr
        }
    }, [])
    
    return (
        <div className="px-5">
            <div className="justify-content-between d-flex">
                <h1>Client Profile</h1>
                <Dropdown className="py-2">
                    <Dropdown.Toggle>
                        Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Create Case Note</Dropdown.Item>
                        <Dropdown.Item href={"/coach/client/actionplan/" + props.userid}>Create Action Plan</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
            <div className="mt-3">
                <Header>BASIC INFORMATION</Header>

                <div className="row">
                    <div className="col-6">
                        <h5>First Name</h5>
                        <p>{result.firstname}</p>
                    </div>
                    <div className="col-6">
                        <h5>Last Name</h5>
                        <p>{result.lastname}</p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        <h5>Gender</h5>
                        <p>{result.gender}</p>
                    </div>
                    <div className="col-6">
                        <h5>Date of Birth</h5>
                        <p>{result.dob}</p>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <Header>Contact Information</Header>

                <div className="row">
                    <div className="col-6">
                        <h5>Email</h5>
                        <p>{result.email}</p>
                    </div>
                    <div className="col-6">
                        <h5>Phone</h5>
                        <p>+65 {result.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails