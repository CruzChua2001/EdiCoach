import React, { useEffect } from "react"
import { useAllClient } from "../Context"
import { Link } from "react-router-dom"

const AllClients = () => {
    const allClients = useAllClient()
    return (
        <>
            { allClients.clientResult.map((item, index) => (
                <Link key={index} to={"/coach/client/"+item.UUID} className="text-dark ">
                    <div className="w-100 p-5 shadow rounded mb-3">
                        <h4>{item.FirstName} {item.LastName}</h4>
                        <h4>{item.firstname} {item.lastname}</h4>
                    </div>
                </Link>
            ))}
        </>
    )
}

export default AllClients