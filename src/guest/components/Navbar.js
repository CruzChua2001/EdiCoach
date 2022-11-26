import React from "react";
import { Dropdown, Button } from "react-bootstrap";

const Navbar = () => {
    return (<>
        <Dropdown>
            <Dropdown.Toggle variant = "">
                Coaching
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <a href="/guest/contact">Contact Us</a>
        <Button>
            Get Started
        </Button>
    </>)
}

export default Navbar