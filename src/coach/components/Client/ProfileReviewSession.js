import React, {useState, useEffect} from "react";
import axios from "axios";
import { BoxArrowUpRight, CaretRight, CaretLeft } from "react-bootstrap-icons";

const ProfileReviewSession = (props) => {

    const [items, setItems] = useState([])
    const [lastPage, setLastPage] = useState(true)
    const [lastItem, setLastItem] = useState({})
    const [page, setPage] = useState(0)

    useEffect(_ => {
        const data = {"id": null, "clientId": props.userid}
        axios.post("https://hhq8y17lsa.execute-api.ap-southeast-1.amazonaws.com/prod/reviewsession", JSON.stringify(data))
        .then(res => {
            const result = res.data
            setItems(result["Items"])
            setLastPage(result["LastPage"])
            setLastItem(result["LastEvaluatedKey"])
            setPage(page+1)
            setSessionStorage(page+1, result["Items"][result["Items"].length-1]["id"]["S"])
        })

        const setSessionStorage = (page, firstItem) => {
            sessionStorage.setItem(page+"_RS", firstItem)
        }
    }, [])

    const setSessionStorage = (page, firstItem) => {
        sessionStorage.setItem(page+"_RS", firstItem)
    }

    const getMonthShort = (month) => {
        switch(month) {
            case 0:
                return 'Jan'
                break
            case 1:
                return 'Feb'
                break
            case 2:
                return 'Mar'
                break
            case 3:
                return 'Apr'
                break
            case 4:
                return 'May'
                break
            case 5:
                return 'Jun'
                break
            case 6:
                return 'Jul'
                break
            case 7:
                return 'Aug'
                break
            case 8:
                return 'Sep'
                break
            case 9:
                return 'Oct'
                break
            case 10:
                return 'Nov'
                break
            case 11:
                return 'Dec'
                break
        }
    }

    const getDate = (date) => {
        // const formatDate = date.split("/")[1] + '/' + date.split("/")[0] + '/' + date.split("/")[2]
        date = new Date(date)
        return date.getDate() + " " + getMonthShort(date.getMonth())
    }

    const nextPage = _ => {
        const data = {"id": lastItem, "clientId": props.userid}
        axios.post("https://hhq8y17lsa.execute-api.ap-southeast-1.amazonaws.com/prod/reviewsession", JSON.stringify(data))
        .then(res => {
            const result = res.data
            setItems(result["Items"])
            setLastPage(result["LastPage"])
            setLastItem(result["LastEvaluatedKey"])
            let nextPage = page+1
            setSessionStorage(nextPage, result["Items"][result["Items"].length-1]["id"]["S"])
            setPage(page+1)
        })
    }

    const prevPage = _ => {
        const data = {"id": {"id": {"S": sessionStorage.getItem(page-2+"_RS")}, "client": {"S": props.userid}}, "clientId": props.userid}
        if(page-1 == 1){
            data.id = null       
        }
        axios.post("https://hhq8y17lsa.execute-api.ap-southeast-1.amazonaws.com/prod/reviewsession", JSON.stringify(data))
        .then(res => {
            const result = res.data
            setItems(result["Items"])
            setLastPage(result["LastPage"])
            setLastItem(result["LastEvaluatedKey"])
            setPage(page-1)
        })
    }

    return (
        <div className="mt-5">
            REVIEW SESSION---------------
            <br />
            <div className="mt-2">
                {items.map((item, index) => (
                    <a href={"/coach/reviewsession/" + props.userid + "/" + item["BookingID"]["S"]} className="text-decoration-none" key={index}>
                        <div className="border rounded shadow mt-2 ps-4 p-3">
                            {getDate(item["StartDateTime"]["S"])} Session

                            <BoxArrowUpRight className="float-end mt-1" />
                        </div>
                    </a>
                ))}
                <div className="justify-content-end d-flex mb-5">
                    <CaretLeft width={25} height={25} className={page > 1 ? "hoverPoint" : "hoverDisable"} color={"grey"} onClick={page > 1 ? prevPage : undefined} />
                    <CaretRight width={25} height={25} className={lastPage ? "hoverDisable" : "hoverPoint"} color={"grey"} onClick={lastPage ? undefined : nextPage} />
                </div>
            </div>
        </div>
    )
}

export default ProfileReviewSession