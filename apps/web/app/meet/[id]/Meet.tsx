"use client";

import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface StreamState {
  isEnabled: boolean;
  stream: MediaStream | null;
}

const servers: RTCConfiguration = {
  iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
  iceCandidatePoolSize: 10,
};

export default function Meet() {
  // Refs for video elements and peer connection
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  // Local and remote streams
  const [localStream, setLocalStream] = useState<StreamState>({
    isEnabled: false,
    stream: null,
  });
  const [remoteStream, setRemoteStream] = useState<StreamState>({
    isEnabled: false,
    stream: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize peer connection
  useEffect(() => {
    // Create new peer connection
    const pc = new RTCPeerConnection(servers);
    peerConnection.current = pc;

    // Handle remote tracks
    pc.ontrack = (event) => {
      const newRemoteStream = new MediaStream();
      event.streams[0]?.getTracks().forEach((track) => {
        newRemoteStream.addTrack(track);
      });

      setRemoteStream({
        isEnabled: true,
        stream: newRemoteStream,
      });

      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = newRemoteStream;
    };

    return () => {
      // Cleanup
      if (localStream.stream) localStream.stream.getTracks().forEach((track) => track.stop());

      // Close peer connection and remove reference
      if (pc.signalingState !== "closed") pc.close();

      peerConnection.current = null;
    };
  }, [localStream.stream]); // Empty dependency array since we only want to create the connection once

  // Update video elements when streams change
  useEffect(() => {
    if (localVideoRef.current && localStream.stream)
      localVideoRef.current.srcObject = localStream.stream;

    if (remoteVideoRef.current && remoteStream.stream)
      remoteVideoRef.current.srcObject = remoteStream.stream;
  }, [localStream.stream, remoteStream.stream]);

  const toggleWebcam = useCallback(async () => {
    try {
      setIsLoading(true);

      if (localStream.isEnabled) {
        // Stop all tracks and reset stream
        localStream.stream?.getTracks().forEach((track) => track.stop());
        setLocalStream({ isEnabled: false, stream: null });
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Only add tracks if peer connection exists and is not closed
      if (peerConnection.current && peerConnection.current.signalingState !== "closed") {
        stream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, stream);
        });
      }

      setLocalStream({
        isEnabled: true,
        stream,
      });
    } catch (error) {
      console.error("Error accessing webcam:", error);
    } finally {
      setIsLoading(false);
    }
  }, [localStream.isEnabled, localStream.stream]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={toggleWebcam}
        disabled={isLoading}
        variant={localStream.isEnabled ? "destructive" : "default"}
      >
        {isLoading ? "Loading..." : localStream.isEnabled ? "Stop Webcam" : "Start Webcam"}
      </Button>

      <div className="flex flex-wrap gap-4 justify-center">
        {localStream.isEnabled && (
          <video
            ref={localVideoRef}
            className="w-80 h-60 rounded-lg border-2 border-gray-300"
            autoPlay
            playsInline
            muted
          />
        )}

        {remoteStream.isEnabled && (
          <video
            ref={remoteVideoRef}
            className="w-80 h-60 rounded-lg border-2 border-gray-300"
            autoPlay
            playsInline
          />
        )}
      </div>
    </div>
  );
}
