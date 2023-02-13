import React from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { subscribeTopic } from '../../script/subscribeupdate'

const FooterDiv = styled.div `
    margin-top: 5%;
    bottom: 0;
    position: relative;
    background-color: #1A284D;
    padding: 4%;
    width: 100%;
`

const Header = styled.h3`
    color: white
`

const Links = styled.div`
    margin-top: 3%;
    margin-bottom: 2%;
    color: #BBBBBB;
`

const LinkTag = styled.a`
    color: #BBBBBB;
    text-decoration: none;
`

const ClientFooter = () => {
    return (
        <FooterDiv className="row">
            <div className="col-12 col-sm-6 col-md-3">
                <Header>Quick Links</Header>
                <Links>
                    <p><LinkTag href="#">Terms &amp; Condition</LinkTag></p>
                    <p><LinkTag href="#">Privacy Policy</LinkTag></p>
                </Links>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <Header>Meet EDICOACH</Header>
                <Links>
                    <p><LinkTag href="/client">Home</LinkTag></p>
                    <p><LinkTag href="/client/coachSelect">Find A Coach</LinkTag></p>
                    <p><LinkTag href="/client/manageAppointments">My Bookings</LinkTag></p>
                    <p><LinkTag href="/client/actionplan">Action Plan</LinkTag></p>
                    <p><LinkTag href="/client/contact">Contact Us</LinkTag></p>
                    <p><LinkTag href="/client/FAQ">FAQ</LinkTag></p>
                </Links>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <Header>Socials</Header>
                <Links>
                    <p><LinkTag href="#">Youtube</LinkTag></p>
                    <p><LinkTag href="#">Facebook</LinkTag></p>
                    <p><LinkTag href="#">Instagram</LinkTag></p>
                    <p><LinkTag href="#">LinkedIn</LinkTag></p>
                </Links>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <Header>Follow</Header>
                <Links>
                    <p>Sign up to keep updated with our latest news</p>
                    <Form.Control type="text" variant="" className="border-1" placeholder="Enter email here" style={{background: 'transparent', color: 'white'}} id="footerSubscribe" />
                    <Button className="border-0 mt-2" style={{backgroundColor: "#692655"}} id="footerSubBtn" onClick={subscribeTopic}>Subscribe</Button>
                </Links>
            </div>
        </FooterDiv>
    )
}

export default ClientFooter