import styled from 'styled-components'
import React, {useState, useEffect, useContext} from "react";
import { Dropdown, Button } from "react-bootstrap";
import axios from 'axios';
import { Container } from "react-bootstrap"
import { AccountContext } from "../../../Account";
import $ from 'jquery';

import config from '../../../../config';

const Header = styled.p`
    font-size: 14px;
    color: grey;
`
const Breadcrump = styled.p`
    display: flex;
    color: grey;
    margin-top: 3%;
`

const ProfileContainer = styled.div`
    margin-top: 5%;
    display: flex;
`

const LeftProfile = styled.div`
    width: 30%;
`

const RightProfile = styled.div`
    width: 70%;
`

const UpdateProfile = () => {
    const [result, setResult] = useState({})
    const { getSession, getData } = useContext(AccountContext);

    useEffect(_ => {
        getData()
        .then((session) => {
            console.log(session);
            let sessionUserid = session.filter((item) => item.Name == "sub")[0].Value;

            let url = "https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/get/" + sessionUserid

            axios.get(url)
            .then(res => {
                const details = formatClientData(res['data'])
                console.log(details[0])
                setResult(details[0])
                $(".profilePic").css("background-image",`url(https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/images/${details[0]["userid"]}.png)`)
                $(".profilePic").css("background-size",`cover`)
                $("#firstname").val(details[0]["firstname"])
                $("#lastname").val(details[0]["lastname"])
                $("#dob").val(details[0]["dob"])
                $("#gender").val(details[0]["gender"])
                $("#phone").val(details[0]["phone"])
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
            })
            .catch((err) => console.log(err))

        
    }, [])

    const Update = () => {
        let firstname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let dob = document.getElementById("dob").value;
        let phone = document.getElementById("phone").value;
        let gender = document.getElementById("gender").value;
        let email = result.email;
        let file = document.getElementById("file").files[0]
        let filepath;

        if (file) {
            console.log(file)
            filepath = `images/${result.userid}.png`;
        }

        fetch(config.USER_MANAGEMENT_API+"/update", {
        method: 'PUT',
        body: JSON.stringify({email, firstname, lastname, dob, phone, gender, filepath}),
        headers: { 'Content-Type': 'application/json' }})
        .then((msg) => {
            msg.json()
            .then(message => {
                if (message.status === "success") {
                    if (message.url) {
                        console.log("url")
                        axios.put(message.url, file, {
                            headers: {
                                "Content-Type":"*/*"
                            }
                        }).then(function(response) {
                            window.location.href = "/client/profile";
                        }).catch(function (error) {
                            document.getElementById("errorMessage").innerText = error;
                            console.log(error);
                        });
                    } else {
                        console.log("no url")
                        window.location.href = "/client/profile";
                    }
                } else {
                    document.getElementById("errorMessage").innerText = message.message;
                    console.log(message);
                }
                
            });
            
            
        }).catch(err => console.log(err))
    }
    
    return (
        <Container>
            <Breadcrump>
                <a href="/client/" className="me-2 text-decoration-none text-secondary"> Home </a>
                /
                <a href="/client/profile" className="me-2 text-decoration-none text-secondary"> Profile </a>
                /
                <b className="mx-2"> Update </b>
            </Breadcrump>

            <ProfileContainer>
                <LeftProfile>
                    <div className='profilePic' style={{ height: "175px",width: "175px",backgroundColor:"gray",borderRadius: "120px",margin:"0 auto"}}>
                        <input id='file' type="file" style={{fontSize:"0.5em",marginTop:"80px", marginLeft:"25px"}} />
                        {/* <img src={`https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/${result.userid}.png`} style={{maxWidth:"100%",minWidth:"100%"}}  /> */}
                    </div>
                </LeftProfile>
                <RightProfile>
                <div className="px-5">
                    <div className="justify-content-between d-flex">
                        <h1>Profile Information</h1>
                    </div>
                    
                    <div className="mt-3">
                        <Header>BASIC INFORMATION</Header>

                        <div className="row">
                            <div className="col-6">
                                <h5>First Name</h5>
                                <input id="firstname" className='form-control' />
                            </div>
                            <div className="col-6">
                                <h5>Last Name</h5>
                                <input id="lastname" className='form-control'  />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-6">
                                <h5>Gender</h5>
                                <input id="gender" className='form-control'  />
                            </div>
                            <div className="col-6">
                                <h5>Date of Birth</h5>
                                <input id="dob" className='form-control'  />
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
                                <input id="phone" className='form-control'  />
                            </div>
                        </div>
                    </div>
                    <div className="justify-content-between d-flex mt-3">
                        <div id="errorMessage"></div>
                        <Button  className="py-2" onClick={Update}>Update</Button>
                    </div>
                </div>
               
                </RightProfile>
            </ProfileContainer>
        </Container>

    )
}

export default UpdateProfile