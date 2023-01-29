import React, { useEffect } from "react"
import { Dropdown } from "react-bootstrap"
import { useActionPlan } from "../Context"
import axios from 'axios'

const ActionPlanDropDown = (props) => {
    let actionPlanContext = useActionPlan();

    useEffect(_ => {
        actionPlanContext.setAllClient([])
        let url = "https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/gettype/Client"
        axios.get(url)
        .then(res => {
            const data = formatClientName(res['data'])
            actionPlanContext.setAllClient(data)
        })

        const formatClientName = (result) => {
            let arr = []

            result.forEach(item => {
                let obj = {}
                obj['name'] = item['firstname']['S'] + " " + item['lastname']['S']
                obj['userid'] = item['userid']['S']
                obj['email'] = item['email']['S']
                arr.push(obj)
            })

            return arr
        }
    },[])

    useEffect(_ => {
        actionPlanContext.setSelected({})
        let url = "https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/get/" + props.userid
        axios.get(url)
        .then(res => {
            const names = formatNameSelected(res['data'])
            actionPlanContext.setSelected(names[0])
        })

        const formatNameSelected = (result) => {
            let arr = []

            result.forEach(item => {
                let obj = {}
                obj['name'] = item['firstname']['S'] + " " + item['lastname']['S']
                obj['userid'] = item['userid']['S']
                obj['email'] = item['email']['S']
                arr.push(obj)
            })

            return arr
        }
    },[])
    
    return (
        <div className="mb-5">
            <b style={{ textDecoration: "underline" }}>General Information</b>
            <br />
            <span>Client</span>
            <Dropdown>
                <Dropdown.Toggle variant="" className="shadow rounded border px-5 py-3" style={{ fontSize: "18px" }}>
                    { actionPlanContext.selected.name }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    { actionPlanContext.allClient.map((item, index) => {
                        if(item.userid != actionPlanContext.selected.userid){
                            return (
                                <Dropdown.Item href={"/coach/client/actionplan/" + item.userid} key={item.userid}>{item.name}</Dropdown.Item>
                            )
                        }
                        return 
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default ActionPlanDropDown