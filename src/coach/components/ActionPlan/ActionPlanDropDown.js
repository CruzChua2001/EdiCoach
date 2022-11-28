import React from "react"
import { Dropdown } from "react-bootstrap"
import { useActionPlan } from "../Context"

const ActionPlanDropDown = () => {
    let actionPlanContext = useActionPlan();

    return (
        <>
            <b style={{ textDecoration: "underline" }}>General Information</b>
            <br />
            <span>Client</span>
            <Dropdown>
                <Dropdown.Toggle variant="" className="shadow rounded border px-5 py-3" style={{ fontSize: "18px" }}>
                    { actionPlanContext.selected.Name }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Edison Choo</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ActionPlanDropDown