import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { AllCoachSessions } from "./AllCoachSessions";
import axios from "axios";
import { AccountContext } from "../../../Account";
import config from "../../../../config";
import { height } from "@mui/system";

function createRow(id, coachName, price, session, date) {
  return {
    id,
    coachName,
    price,
    session,
    date,
  };
}

export const ManageAppointments = () => {
  const { getSession, getData } = useContext(AccountContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [paymentID, setPaymentID] = useState(null);
  var [sessionData, setSessionData] = useState([]);

  var options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    getData()
      .then((session) => {
        console.log(session);
        setSessionData(session);
        getPaymentData(session.filter((param) => param.Name == "sub")[0].Value);
      })
      .catch((err) => console.log(err));
  }, []);

  const getPaymentData = async (id) => {
    let url = `${config.BOOKING_API}payment?ClientID=${id}`;
    console.log(url);
    try {
      const response = await axios.get(url);
      let d = [];
      response.data.Items.map((payment) => {
        d.push(
          createRow(
            payment.PaymentID.S,
            payment.CoachName.S,
            payment.Price.N,
            payment.Session.N,
            new Date(payment.PaymentDateTime.S).toLocaleDateString(
              "en-US",
              options
            )
          )
        );
      });
      setData(d);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    setPaymentID(id);
  };

  return (
    <Container>
      <Row>
        <Col className="col-3">
          <div className="saTitle">
            <h6>Session</h6>
          </div>
          <div className="shadow rounded" style={{ height: 350 }}>
            <List>
              {data &&
                data.map((payment) => {
                  return (
                    <ListItem disablePadding key={payment.id}>
                      <ListItemButton
                        onClick={() => {
                          handleClick(payment.id);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={`https://st.depositphotos.com/1144472/1532/i/450/depositphotos_15320783-stock-photo-portrait-of-young-woman-at.jpg`}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={payment.coachName} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </div>
        </Col>
        <Col className="col-9">
          {paymentID && <AllCoachSessions paymentID={paymentID} />}
          {!paymentID && (
            <div
              style={{
                textAlign: "center",
                height: "400px",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1>Click on a session</h1>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
