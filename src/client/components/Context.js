import React, { createContext, useContext, useEffect, useState } from "react"

const ActionPlanContext = createContext()

export const useActionPlan = () => {
    return useContext(ActionPlanContext)
}

export const ActionPlanProvider = ({ children, clientUserId }) => {
    const [actionPlan, setActionPlan] = useState([])

    useEffect(() => {
        console.log(clientUserId)
        if(clientUserId != ""){
            let url = "https://en3gq3zwt3.execute-api.ap-southeast-1.amazonaws.com/prod/actionplan?client=" + clientUserId

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
                console.log(result)
                setActionPlan(result)
            })
            .catch((error) => {
                console.log("Error: " + error);
            })
        }
    }, [clientUserId])

    return (
        <ActionPlanContext.Provider value={{ actionPlan: actionPlan, setActionPlan: setActionPlan }}>
            { children }
        </ActionPlanContext.Provider>
    )
}