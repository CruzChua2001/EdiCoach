import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Bell, PersonCircle } from 'react-bootstrap-icons'

const Item = styled.a`
    margin-right: 0.5%;
    font-size: 18px;
    color: black;

    &:hover {
        color: black;
    }
`

const Navitem = () => {
    return (
        <>
            <Item href="/coach/" className="mr-2"> Appointment </Item>
            <Item href="/coach/client" className="mr-2"> Clients </Item>
            <Item href="/coach/contact" className="mr-2"> Contact Us </Item>
            <Item href="/coach/faq" className="mr-3"> FAQ </Item>

            <Bell size={25} className="mr-3" />
            <PersonCircle size={25} />
        </>
    )
}

export default Navitem