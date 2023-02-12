import React from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const FooterDiv = styled.div `
    margin-top: 10%;
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

const AdminFooter = () => {
    return (
        <FooterDiv className="row" id="footer">
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
                    <p><LinkTag href="/admin">Home</LinkTag></p>
                    <p><LinkTag href="/admin/request">Request</LinkTag></p>
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
                    <Form.Control type="text" variant="" className="border-1" placeholder="Enter email here" style={{background: 'transparent'}} id="footerSubscribe" />
                    <Button className="border-0 mt-2" style={{backgroundColor: "#692655"}} id="footerSubBtn">Subscribe</Button>
                </Links>
            </div>
        </FooterDiv>
    )
}

export default AdminFooter