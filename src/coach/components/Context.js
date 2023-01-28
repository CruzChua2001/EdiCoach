import React, { createContext, useContext, useEffect, useState } from "react"

const AllClientContext = createContext();

export const useAllClient = () => {
    return useContext(AllClientContext)
}

export const AllClient = ({ children }) => {
    const [clientResult, setClientResult] = useState([])

    useEffect(() => {
        //fetch api here
        fetch("https://i0lyxkgqc4.execute-api.us-east-1.amazonaws.com/uat/getallclients")
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
            setClientResult(result)
        })
        .catch((error) => {
            console.log("Error: " + error);
        })

    }, [])

    return (
        <AllClientContext.Provider value={{ clientResult: clientResult, setClientResult: setClientResult }}> 
            { children } 
        </AllClientContext.Provider>
    )
}

const ActionPlanContext = createContext();

export const useActionPlan = () => {
    return useContext(ActionPlanContext)
}

export const ActionPlanProvider = ({ children }) => {
    const [selected, setSelected] = useState({UUID: "testing", Name: "Cruz Chua"})
    const [allClient, setAllClient] = useState([])
    const [actionPlan, setActionPlan] = useState({})

    return (
        <ActionPlanContext.Provider value={{ selected: selected, setSelected: setSelected, allClient: allClient, setAllClient: setAllClient, actionPlan: actionPlan, setActionPlan: setActionPlan }}>
            { children }
        </ActionPlanContext.Provider>
    )
}