import React, { useRef, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMaster } from "react-kinesis-webrtc";
import { MicOff, Videocam, CallEnd } from "@mui/icons-material";

const viewer = {};

var audioStatus = true;
var videoStatus = true;

function Peer({ media }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = media;
    }
  }, [ref, media]);
  return <video autoPlay ref={ref} />;
}

export default function CoachVideoStream() {
  const localMediaRef = useRef();
  const config = {
    credentials: {
      accessKeyId: "AKIATGEGFJCERG3HVFVD",
      secretAccessKey: "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",
    },
    channelARN:
      "arn:aws:kinesisvideo:ap-southeast-1:219324696713:channel/TestStream/1674148588980",
    region: "ap-southeast-1",
    media: {
      audio: audioStatus,
      video: videoStatus,
    },
    debug: true,
  };
  const { error, localMedia, peers } = useMaster(config);

  // Assign the local media stream to a video source
  useEffect(() => {
    if (localMediaRef.current) {
      localMediaRef.current.srcObject = localMedia;
    }
  }, [localMedia, localMediaRef]);

  // Display an error
  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  return (
    <Container>
      {/* Display the local media stream. */}
      <video autoPlay ref={localMediaRef} width={"100%"} />
      <Row>
        <Col className="d-grid">
          <Button size="lg" id="MicBtn">
            <MicOff />
          </Button>
        </Col>
        <Col className="d-grid">
          <Button size="lg" id="VidBtn">
            <Videocam />
          </Button>
        </Col>
        <Col className="d-grid">
          <Button size="lg" id="EndCallBtn">
            <CallEnd />
          </Button>
        </Col>
      </Row>
      {/* Display a Peer component for each remote peer stream */}
      {peers.map(({ id, media }) => (
        <div>
          <p key={id + "id"}>{id}</p>
          <Peer key={id} media={media} />
        </div>
      ))}
    </Container>
  );
}
