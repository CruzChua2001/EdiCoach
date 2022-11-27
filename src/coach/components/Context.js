import React, { createContext, useContext, useEffect, useState } from "react"

const AllClientContext = createContext();

export const useAllClient = () => {
    return useContext(AllClientContext)
}

export const AllClient = ({ children }) => {
    const [filter, setFilter] = useState({})
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
            setClientResult(result.Items)
        })
        .catch((error) => {
            console.log("Error: " + error);
        })

    }, [filter])

    return (
        <AllClientContext.Provider value={{ filter: filter, setFilter: setFilter, clientResult: clientResult, setClientResult: setClientResult }}> 
            { children } 
        </AllClientContext.Provider>
    )
}