import React, {useState, useContext, useEffect} from "react"
import { Container } from "react-bootstrap";
import ActionPlanContainer from "./ActionPlanContainer";
import { ActionPlanProvider } from "../Context"
import { AccountContext } from "../../../Account";

const ClientActionPlan = () => {
    const { getSession, getData } = useContext(AccountContext);
    const [sessionData, setSessionData] = useState({});
    useEffect(() => {
        getData()
        .then((session) => {
            const result = formatSessionData(session)
            setSessionData(result);
        })
        .catch((err) => console.log(err));

        const formatSessionData = (session) => {
            let obj = {}
            obj["userid"] = session[1]["Value"]
            return obj
        }
    }, []);

    return (
        <Container>
            <h2>Action Plan</h2>

            <hr className="border border-dark" />

            <ActionPlanProvider clientUserId={sessionData["userid"]}>
                <ActionPlanContainer />
            </ActionPlanProvider>

        </Container>
    )
}

export default ClientActionPlan