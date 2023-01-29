import React, { useEffect } from "react"
import { useAllClient } from "../Context"
import { Link } from "react-router-dom"

const AllClients = () => {
    const allClients = useAllClient()
    const getAge = (dob) => {
        const formatDateArr = dob.split("/")
        const formatDate = formatDateArr[1] + "/" + formatDateArr[0] + "/" + formatDateArr[2]
        let year = new Date(formatDate).getFullYear()
        let currYear = new Date().getFullYear()
        return currYear - year
    }

    return (
        <>
            { allClients.clientResult.map((item, index) => (
                <Link key={index} to={"/coach/client/"+item.userid} className="text-dark text-decoration-none">
                    <div className="hoverClientBox w-100 p-5 rounded mb-3">
                        <div className="d-flex">
                            <h4 className="text-decoration-underline">{item.firstname} {item.lastname}</h4>
                            <span className="mt-2 ms-2">{getAge(item.dob)}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}

export default AllClients