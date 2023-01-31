import React, { useEffect, useState } from "react"
import { useAllClient } from "../Context"
import { Link } from "react-router-dom"
import axios from "axios"

const AllClients = () => {
    const allClients = useAllClient()
    const getAge = (dob) => {
        const formatDateArr = dob.split("/")
        const formatDate = formatDateArr[1] + "/" + formatDateArr[0] + "/" + formatDateArr[2]
        let year = new Date(formatDate).getFullYear()
        let currYear = new Date().getFullYear()
        return currYear - year
    }

    const [alpha, setAlpha] = useState({
        "Selected": "",
        "alpha": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    })

    const setClientByAlpha = (e) => {
        const query = e.target.dataset.alpha
        let tmp = {...alpha, "Selected": query}
        setAlpha(tmp)

        const url = `https://v0wz6u3kc1.execute-api.ap-southeast-1.amazonaws.com/prod/search/alphabet?q=${query}*&sort=firstname+asc&q.options=%7B%22defaultOperator%22%3A%22and%22%2C%22fields%22%3A%5B%22firstname%22%5D%7D&fq=usertype:'Client'`

        axios.get(url)
        .then(response => {
            const result = formatCloudSearchData(response['data']['hits']['hit'])
            allClients.setClientResult(result)
        })

        const formatCloudSearchData = (result) => {
            let arr = []
            console.log(result)
            result.forEach(item => {
                let obj = item['fields']
                obj['email'] = item['id']
                arr.push(obj)
            })
    
            return arr
        }
    }

    const resetAlpha = () => {
        let url = "https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/gettype/Client"
        let tmp = {...alpha, "Selected": ""}
        setAlpha(tmp)

        axios.get(url)
        .then(response => {
            const result = formatClientData(response['data'])
            allClients.setClientResult(result)
        })

        const formatClientData = (result) => {
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
    }

    return (
        <>
            <div className="row">
                <div className="col-4 col-lg-2">
                    Alphabetical
                    <br />
                    <div className="text-break text-left" style={{ cursor: 'pointer' }}>
                        {alpha.alpha.map((item, index) => {
                            if(item == alpha.Selected) {
                                return (
                                    <b key={index} className="me-2">{item}</b>
                                )
                            }
                            else {
                                return (
                                    <a key={index} className="me-2" onClick={setClientByAlpha} data-alpha={item}>{item}</a>
                                )
                            }
                        })}
                    </div>
                    <br />
                    {alpha.Selected != "" && 
                        <a onClick={resetAlpha} style={{ cursor: 'pointer' }} className="btn btn-primary">Reset</a>
                    }
                </div>
                <div className="col-6 col-lg-10">
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
                </div>
            </div>
            
        </>
    )
}

export default AllClients