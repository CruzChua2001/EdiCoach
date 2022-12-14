import React, { createContext, useContext, useEffect, useState } from "react"

const ActionPlanContext = createContext()

export const useActionPlan = () => {
    return useContext(ActionPlanContext)
}

export const ActionPlanProvider = ({ children, client }) => {
    const [actionPlan, setActionPlan] = useState([])

    useEffect(() => {
        let url = "https://6i1lbzm98l.execute-api.us-east-1.amazonaws.com/uat/actionplan?client=" + client

        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`)
            }
            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError("Oops, we haven't got JSON!")
            }
            return response.json()
        })
        .then((result) => {
            setActionPlan(result)
        })
        .catch((error) => {
            console.log("Error: " + error);
        })
    }, [])

    return (
        <ActionPlanContext.Provider value={{ actionPlan: actionPlan, setActionPlan: setActionPlan }}>
            { children }
        </ActionPlanContext.Provider>
    )
}