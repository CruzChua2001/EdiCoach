import React, {useState, useContext, useEffect} from "react"
import { Container } from "react-bootstrap";
import { Bell, BellSlash } from "react-bootstrap-icons";

import ActionPlanContainer from "./ActionPlanContainer";
import { ActionPlanProvider } from "../Context"
import { AccountContext } from "../../../Account";
import axios from "axios";

const ClientActionPlan = () => {
    const { getSession, getData } = useContext(AccountContext)
    const [sessionData, setSessionData] = useState({})
    const [subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        getData()
        .then((session) => {
            const result = formatSessionData(session)
            setSessionData(result);
            checkSubscribed(result)
        })
        .catch((err) => console.log(err));

        const formatSessionData = (session) => {
            let obj = {}
            obj["userid"] = session[1]["Value"]
            obj["Email"] = session[8]["Value"]
            return obj
        }
    }, []);

    const checkSubscribed = (sessionUser) => {
        checkNotification(sessionUser["Email"])
    }

    const notifyClient = (e) => {
        const action = (e.target.dataset.subscribed == "true") ? true : false
        const url = "https://en3gq3zwt3.execute-api.ap-southeast-1.amazonaws.com/prod/notification"
        const data = {"Email": sessionData["Email"], "Unsubscribe": action }

        axios.post(url, JSON.stringify(data))
        .then(res => {
            console.log(res)
            if(!action) {
                alert("Please check email to confirm receiving updates")
            }
            
            if(action) {
                setSubscribed(false)
            }
        })
    }

    const checkNotification = (clientEmail) => {
        const url = "https://en3gq3zwt3.execute-api.ap-southeast-1.amazonaws.com/prod/notification"        
        axios.get(url+"?Email="+clientEmail)
        .then(res => {
            if(res.data["subscription_arn"]["subscription_arn"] == true) {
                setSubscribed(true)
            }
        })
    }

    return (
        <Container>
            <div className="d-flex">
                <h2>Action Plan</h2>
                {subscribed ? 
                    <Bell width={20} height={20} className="notificationBell ms-2 mt-2" color={"black"} onClick={notifyClient} data-subscribed="true" />
                    :
                    <BellSlash width={20} height={20} className="notificationBell ms-2 mt-2" color={"black"} onClick={notifyClient} data-subscribed="false" />
                }
            </div>
            <hr className="border border-dark" />

            <ActionPlanProvider clientUserId={sessionData["userid"]}>
                <ActionPlanContainer />
            </ActionPlanProvider>

        </Container>
    )
}

export default ClientActionPlan