import React, { useRef, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMaster } from "react-kinesis-webrtc";

import "../../../videostream/Video.css";

import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  CallEnd,
  RadioButtonChecked,
  Stop,
  Download,
} from "@mui/icons-material";

const viewer = {};

var audioStatus = true;
var videoStatus = true;

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
  const recordRef = useRef(true);

  const [remoteMedia, setRemoteMedia] = useState();

  const remoteRef = useRef();

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

  var mediaRecorder = null;
  let chunks = [];
  if (remoteMedia) {
    mediaRecorder = new MediaRecorder(remoteMedia);
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
      console.log(e.data);
    };
    mediaRecorder.onstop = (e) => {
      var downloadBtn = document.getElementById("downloadBtn");
      console.log(chunks.length);
      let recordBlob = new Blob(chunks, { type: "video/webm" });
      var downloadBtnContainer = document.getElementById(
        "downloadBtnContainer"
      );
      downloadBtnContainer.hidden = false;
      downloadBtn.href = window.URL.createObjectURL(recordBlob);
      downloadBtn.download = "RecordedVideo.webm";
      a.click();
    };
  }

  function handleRecord() {
    if (recordRef.current == true) {
      recordRef.current = false;
      mediaRecorder.start(1000);
      console.log(mediaRecorder.state);
      console.log("recorder started");
      console.log(mediaRecorder.state);
    } else {
      recordRef.current = true;
      console.log(mediaRecorder.state);
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
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
        <video
          autoPlay
          className="secondaryVideo"
          ref={localMediaRef}
          muted={true}
        />
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
          {remoteMedia && (
            <button
              className="circleButton"
              size="lg"
              id="VidBtn"
              onClick={handleRecord}
            >
              {recordRef.current ? <RadioButtonChecked /> : <Stop />}
            </button>
          )}
          <button
            className="circleButton"
            size="lg"
            id="EndCallBtn"
            style={{ backgroundColor: "red" }}
          >
            <CallEnd />
          </button>
          <button
            className="circleButton"
            hidden={true}
            id="downloadBtnContainer"
          >
            <a id="downloadBtn">
              <Download />
            </a>
          </button>
        </div>
        <div></div>
      </div>
    </Container>
  );

  function Peer({ media }) {
    useEffect(() => {
      if (remoteRef.current) {
        remoteRef.current.srcObject = media;
        setRemoteMedia(media);
      }
    }, [remoteRef, media]);
    return (
      <video
        autoPlay
        ref={remoteRef}
        className="mainVideo"
        poster="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
      />
    );
  }
}
