import React from 'react'
import { Link } from 'react-router-dom'

const Navitem = () => {
    return (
        <>
            <Link to="/admin/" className="nav-item"> Home </Link>
            <Link to="/admin/login" className="nav-item"> Login </Link>
            <Link to="/admin/register" className="nav-item"> Sign Up </Link>
            <Link to="/admin/faq" className="nav-item"> FAQ </Link>
        </>
    )
}

export default Navitem