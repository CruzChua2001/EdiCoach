import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import styled from "styled-components";
import { Container, Dropdown, Row, Col, Spinner } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import { List, ListItemButton, ListItemText, Divider } from "@mui/material";

import TranscriptText from "./TranscriptText";
import ClientInformation from "./ClientInformation";

import config from "../../../../config";

const Breadcrump = styled.p`
  display: flex;
  color: grey;
  margin-top: 3%;
`;

const ReviewSession = () => {
  const { id, bookingid } = useParams();
  const [bookingDetails, setBookingDetails] = useState({ Date: "" });
  const [emotions, setEmotions] = useState(null);
  const [name, setName] = useState("");

  useEffect((_) => {
    axios
      .get(
        "https://q4xlyhs9l1.execute-api.ap-southeast-1.amazonaws.com/prod/booking_bookingid/" +
          bookingid
      )
      .then((res) => {
        const data = res.data.Items[0];
        let obj = {};
        obj["Date"] = data["StartDateTime"]["S"];
        setBookingDetails(obj);
        console.log("Data", data.JobID.S);

        //WK Code
        getEmotions(data.JobID.S);
      });

    axios
      .get(
        "https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/get/" +
          id
      )
      .then((res) => {
        console.log(res);
        const data = res.data[0];
        setName(data["firstname"]["S"] + " " + data["lastname"]["S"]);
      });
  }, []);

  const getEmotions = async (jobID) => {
    try {
      let url = `${config.BOOKING_API}get_faces/${jobID}`;
      const response = await axios.get(url);
      console.log(response.data);
      let emList = [];
      let curObj = new emObj(
        response.data[0].Timestamp,
        response.data[0].Timestamp,
        response.data[0].Emotions
      );
      for (let i = 1; i < response.data.length; i++) {
        curObj.end = response.data[i].Timestamp;
        if (curObj.emo !== response.data[i].Emotions) {
          emList.push(curObj);
          curObj = new emObj(
            response.data[i].Timestamp,
            response.data[i].Timestamp,
            response.data[i].Emotions
          );
          curObj.start = response.data[i].Timestamp;
          curObj.emo = response.data[i].Emotions;
        }
        if (i == response.data.length - 1) {
          emList.push(curObj);
        }
      }
      setEmotions(emList);
    } catch (err) {
      console.log(err);
    }
  };

  function emObj(start, end, emotion) {
    this.start = start;
    this.end = end;
    this.emo = emotion;
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function capitalizeFirstLetter(str) {
    const capitalized = str.replace(/^./, str[0].toUpperCase());

    return capitalized;
  }

  return (
    <Container>
      <Breadcrump>
        <a href="/coach" className="me-2 text-decoration-none text-secondary">
          {" "}
          Home{" "}
        </a>
        /
        <a
          href="/coach/client"
          className="mx-2 text-decoration-none text-secondary"
        >
          {" "}
          Client{" "}
        </a>
        /
        <a
          href={"/coach/client/" + id}
          className="mx-2 text-decoration-none text-secondary"
        >
          {" "}
          {name}{" "}
        </a>
        /<b className="mx-2"> Review Session </b>
      </Breadcrump>

      <div className="d-flex">
        <h1>Review Session</h1>

        <Dropdown className="reviewSessionAction float-end py-2">
          <Dropdown.Toggle>Action</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Add to Case Note</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Print</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Favourite</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="mt-4">
        <ClientInformation userid={id} bookingDetails={bookingDetails} />
        <br />
        <Tabs defaultActiveKey="transcript" className="mb-3">
          <Tab eventKey="transcript" title="Transcript">
            <TranscriptText bookingid={bookingid} />
          </Tab>
          <Tab eventKey="video" title="Video">
            <Row>
              <Col className="col-9">
                <video controls width={"100%"} id="vid">
                  <source
                    src={
                      "https://booking-recordings.s3.ap-southeast-1.amazonaws.com/recordings/" +
                      bookingid +
                      ".mp4"
                    }
                  />
                </video>
              </Col>
              <Col className="col-3">
                <h4>Emotions</h4>
                {emotions && (
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                      position: "relative",
                      overflow: "auto",
                      maxHeight: 600,
                      "& ul": { padding: 0 },
                    }}
                  >
                    {" "}
                    {emotions.map((emotion) => {
                      return (
                        <div key={emotion.start}>
                          <ListItemButton
                            onClick={() => {
                              document.getElementById("vid").currentTime =
                                emotion.start / 1000;
                            }}
                          >
                            <ListItemText
                              primary={`${capitalizeFirstLetter(
                                emotion.emo.toLowerCase()
                              )} : ${millisToMinutesAndSeconds(
                                emotion.start
                              )} - ${millisToMinutesAndSeconds(emotion.end)}`}
                            />
                          </ListItemButton>
                          <Divider />
                        </div>
                      );
                    })}
                  </List>
                )}
                {!emotions && (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </Col>
            </Row>
          </Tab>
        </Tabs>
        <br />
      </div>
    </Container>
  );
};

export default ReviewSession;
