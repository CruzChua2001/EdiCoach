import React, { useRef, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMaster } from "react-kinesis-webrtc";
import { useNavigate } from "react-router-dom";

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

import axios from "axios";
import config from "../../../../config";

const viewer = {};

var audioStatus = true;
var videoStatus = true;

export default function CoachVideoStream() {
  const navigate = useNavigate();
  const { id } = useParams();
  const localMediaRef = useRef();
  const [vidConfig, setVidConfig] = useState({
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
  });
  const [data, setData] = useState(null);
  useEffect(() => {
    const getBookingData = async () => {
      try {
        let url = `${config.BOOKING_API}booking_bookingid/${id}`;
        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data);
        let vConfig = {
          credentials: {
            accessKeyId: "AKIATGEGFJCERG3HVFVD",
            secretAccessKey: "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",
          },
          channelARN: response.data.Items[0].ChannelARN.S,
          region: "ap-southeast-1",
          media: {
            audio: audioStatus,
            video: videoStatus,
          },
          debug: true,
        };
        setVidConfig(vConfig);
      } catch (err) {
        console.log(err.message);
      }
    };
    getBookingData();
  }, [id]);

  const { error, localMedia, peers } = useMaster(vidConfig);
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

  function handleEndCall() {
    console.log(data.Items[0].ChannelARN.S);
    let url = `${config.BOOKING_API}video_stream`;
    try {
      var body = {
        BookingID: id,
        ChannelARN: data.Items[0].ChannelARN.S,
      };
      axios.delete(url, { data: JSON.stringify(body) }).then((response) => {
        navigate(`/coach/`);
      });
    } catch (err) {
      console.log(err);
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
      console.log(chunks.length);
      let recordBlob = new Blob(chunks, { type: "video/webm" });
      var reader = new FileReader();
      reader.readAsDataURL(recordBlob);
      reader.onloadend = () => {
        var base64String = reader.result;
        console.log(base64String);
        postData(base64String);
      };
    };
  }

  function handleRecord() {
    recordRef.current = false;
    mediaRecorder.start(1000);
    document.getElementById("RecordBtn").style.display = "none";
    document.getElementById("RecordBtnStop").style.display = "inline";
  }

  function handleStopRecord() {
    recordRef.current = true;
    mediaRecorder.stop();
    document.getElementById("RecordBtnStop").style.display = "none";
  }

  const postData = async (base64String) => {
    try {
      var body = {
        BookingID: id,
        Base64Vid: base64String,
      };
      await axios.post(`${config.BOOKING_API}save_vid`, JSON.stringify(body), {
        headers: {
          "content-type": "application/json",
        },
      });
    } catch (err) {
      console.log("Error", err);
    } finally {
    }
  };

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
            <>
              <button
                className="circleButton"
                size="lg"
                id="RecordBtn"
                onClick={handleRecord}
              >
                <RadioButtonChecked />
              </button>
              <button
                className="circleButton"
                size="lg"
                id="RecordBtnStop"
                style={{ display: "none" }}
                onClick={handleStopRecord}
              >
                <Stop />
              </button>
            </>
          )}

          <button
            className="circleButton"
            size="lg"
            id="EndCallBtn"
            onClick={handleEndCall}
            style={{ backgroundColor: "red" }}
          >
            <CallEnd />
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
