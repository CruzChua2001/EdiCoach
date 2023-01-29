import React, { useRef, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMaster } from "react-kinesis-webrtc";

import "../../../videostream/Video.css";

import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  CallEnd,
} from "@mui/icons-material";

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
  return (
    <video
      autoPlay
      ref={ref}
      className="mainVideo"
      poster="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
    />
  );
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
  const [isVideo, setIsVideo] = useState(true);
  const [isMic, setIsMic] = useState(true);

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

  function handleVidInput() {
    if (localMediaRef.current) {
      setIsVideo(!isVideo);
      localMedia.getVideoTracks()[0].enabled = !isVideo;
    }
  }

  function handleMicInput() {
    if (localMediaRef.current) {
      setIsMic(!isMic);
      localMedia.getAudioTracks()[0].enabled = !isMic;
    }
  }

  return (
    <Container>
      {/* Display the local media stream. */}
      <div className="mainVideoContainer">
        <img
          src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
          className="mainVideo"
        />
        {peers.map(({ id, media }) => (
          <div>
            <Peer key={id} media={media} />
          </div>
        ))}
        <div className="secondaryVideoContainer">
          <video autoPlay className="secondaryVideo" ref={localMediaRef} />
        </div>
        <div className="callBtnGroup">
          <button className="circleButton" id="MicBtn" onClick={handleMicInput}>
            {isMic ? <Mic /> : <MicOff />}
          </button>
          <button
            className="circleButton"
            size="lg"
            id="VidBtn"
            onClick={handleVidInput}
          >
            {isVideo ? <Videocam /> : <VideocamOff />}
          </button>
          <button
            className="circleButton"
            size="lg"
            id="EndCallBtn"
            style={{ backgroundColor: "red" }}
          >
            <CallEnd />
          </button>
        </div>
      </div>
    </Container>
  );
}
