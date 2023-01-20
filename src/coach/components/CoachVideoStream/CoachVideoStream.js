import React, { useRef, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMaster } from "react-kinesis-webrtc";

const viewer = {};

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
      audio: true,
      video: true,
    },
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
      <p>Hello</p>
      {/* Display the local media stream. */}
      <video autoPlay ref={localMediaRef} />
      {/* Display a Peer component for each remote peer stream */}
      {peers.map(({ id, media }) => (
        <Peer key={id} media={media} />
      ))}
    </Container>
  );
}
