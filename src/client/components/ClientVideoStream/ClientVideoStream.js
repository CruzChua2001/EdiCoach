import React, { useEffect, useRef } from "react";
import { useViewer } from "react-kinesis-webrtc";

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

  // Display the peer media stream
  return (
    <div>
      <video autoPlay ref={videoRef} />
      <video controls autoPlay ref={localMediaRef} muted />
    </div>
  );
}
