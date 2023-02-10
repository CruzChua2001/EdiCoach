import styled from 'styled-components'
import React, {useState, useEffect, useContext} from "react";
import { Dropdown } from "react-bootstrap";
import axios from 'axios';
import { Container } from "react-bootstrap"
import { AccountContext } from "../../../Account";
import $ from 'jquery';

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

const ProfileDetails = () => {
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
                $(".profilePic").css("background-image",`url(https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/images/${details[0]["userid"]}.png?time=${new Date().getTime()})`)
                $(".profilePic").css("background-size",`cover`)
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
    
    return (
        <Container>
            <Breadcrump>
                <a href="/client/" className="me-2 text-decoration-none text-secondary"> Home </a>
                /
                <b className="mx-2"> Profile </b>
            </Breadcrump>

            <ProfileContainer>
                <LeftProfile>
                    <div className='profilePic' style={{ height: "175px",width: "175px",backgroundColor:"gray",borderRadius: "120px",margin:"0 auto"}}>
                        {/* <img src={`https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/${result.userid}.png`} style={{maxWidth:"100%",minWidth:"100%"}}  /> */}
                    </div>
                </LeftProfile>
                <RightProfile>
                <div className="px-5">
                    <div className="justify-content-between d-flex">
                        <h1>Profile Information</h1>
                        <Dropdown className="py-2">
                            <Dropdown.Toggle>
                                Action
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href={"/client/updateprofile"}>Update Information</Dropdown.Item>
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
                </RightProfile>
            </ProfileContainer>
        </Container>

    )
}

export default ProfileDetails