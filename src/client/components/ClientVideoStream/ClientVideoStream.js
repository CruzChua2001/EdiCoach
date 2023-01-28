import React, { useEffect, useRef, useState } from "react";
import { useViewer } from "react-kinesis-webrtc";
import { Container } from "react-bootstrap";

import "../../../videostream/Video.css";

import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  CallEnd,
} from "@mui/icons-material";

export default function ClientVideoStream() {
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
    debug: true,
  };

  const { error, peer: { media } = {}, localMedia } = useViewer(config);
  const [isVideo, setIsVideo] = useState(true);
  const [isMic, setIsMic] = useState(true);

  useEffect(() => {
    if (localMediaRef.current) {
      localMediaRef.current.srcObject = localMedia;
    }
  }, [localMedia, localMediaRef]);

  const videoRef = useRef();

  // Assign the peer media stream to a video source
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = media;
    }
  }, [media, videoRef]);

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

  // Display the peer media stream
  return (
    <Container>
      {/* Display the local media stream. */}
      <div className="mainVideoContainer">
        <img
          src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
          className="mainVideo"
        />
        <video autoPlay ref={videoRef} className="mainVideo" />
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
