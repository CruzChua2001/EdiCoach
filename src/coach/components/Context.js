import React, { createContext, useContext, useEffect, useState } from "react"

const AllClientContext = createContext();

export const useAllClient = () => {
    return useContext(AllClientContext)
}

export const AllClient = ({ children }) => {
    const [clientResult, setClientResult] = useState([])

    useEffect(() => {
        //fetch api here
        fetch("https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/gettype/Client")
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
            const formattedResult = formatResult(result)
            setClientResult(formattedResult)
        })
        .catch((error) => {
            console.log("Error: " + error);
        })

        const formatResult = (result) => {
            let arr = []
            result.forEach(item => {
                let obj = {}
                obj['dob'] = item['dob']['S']
                obj['firstname'] = item['firstname']['S']
                obj['gender'] = item['gender']['S']
                obj['lastname'] = item['lastname']['S']
                obj['phone'] = item['phone']['S']
                obj['userid'] = item['userid']['S']
                arr.push(obj)
            })
            return arr
        }

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
    const [selected, setSelected] = useState({})
    const [allClient, setAllClient] = useState([])
    const [actionPlan, setActionPlan] = useState({})

    return (
        <ActionPlanContext.Provider value={{ selected: selected, setSelected: setSelected, allClient: allClient, setAllClient: setAllClient, actionPlan: actionPlan, setActionPlan: setActionPlan }}>
            { children }
        </ActionPlanContext.Provider>
    )
}