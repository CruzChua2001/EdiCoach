import React from 'react'
import { Link } from 'react-router-dom'

const Navitem = () => {
    return (
        <>
            <Link to="/coach/" className="nav-item"> Appointment </Link>
            <Link to="/coach/clients" className="nav-item"> Clients </Link>
            <Link to="/coach/contact" className="nav-item"> Contact Us </Link>
            <Link to="/coach/faq" className="nav-item"> FAQ </Link>
        </>
    )
}

export default Navitem