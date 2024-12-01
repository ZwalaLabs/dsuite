"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface StreamState {
  isEnabled: boolean;
  stream: MediaStream | null;
}

const servers: RTCConfiguration = {
  iceServers: [
    {
      urls: [
        "stun:zxstun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function Meet() {
  const params = useParams<{ id: string }>();

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

  console.log({ localStream, remoteStream });

  // Initialize peer connection
  useEffect(() => {
    const pc = new RTCPeerConnection(servers);
    peerConnection.current = pc;

    // Handle remote tracks
    pc.ontrack = (event) => {
      console.log("Received remote track", event.streams[0]);

      // Ensure we're using the first stream from the event
      const stream = event.streams[0];
      if (!stream) return;

      setRemoteStream({
        isEnabled: true,
        stream: stream, // Use the stream directly instead of creating new MediaStream
      });
    };

    // Handle connection state changes
    pc.onconnectionstatechange = () => {
      console.log("Connection state:", pc.connectionState);
    };

    // Handle ICE connection state changes
    pc.oniceconnectionstatechange = () => {
      console.log("ICE connection state:", pc.iceConnectionState);
    };

    return () => {
      if (localStream.stream) {
        localStream.stream.getTracks().forEach((track) => track.stop());
      }
      if (pc.signalingState !== "closed") pc.close();
      peerConnection.current = null;
    };
  }, []);

  // Update video elements when streams change
  useEffect(() => {
    if (localVideoRef.current && localStream.stream) {
      localVideoRef.current.srcObject = localStream.stream;
    }
    if (remoteVideoRef.current && remoteStream.stream) {
      console.log("Setting remote video source", remoteStream.stream);
      remoteVideoRef.current.srcObject = remoteStream.stream;
    }
  }, [localStream.stream, remoteStream.stream]);

  const toggleWebcam = async () => {
    try {
      setIsLoading(true);

      if (localStream.isEnabled) {
        localStream.stream?.getTracks().forEach((track) => track.stop());
        setLocalStream({ isEnabled: false, stream: null });
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Add tracks to peer connection
      if (peerConnection.current) {
        stream.getTracks().forEach((track) => {
          if (peerConnection.current) {
            console.log("Adding track to peer connection", track.kind);
            peerConnection.current.addTrack(track, stream);
          }
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
  };

  async function createOffer() {
    try {
      if (!peerConnection.current || !localStream.stream) {
        console.error("No peer connection or local stream");
        return;
      }

      const pc = peerConnection.current;

      // Reference Firestore collections
      const callDoc = doc(db, "calls", params.id);
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      // Get candidates for caller
      pc.onicecandidate = async (event) => {
        if (event.candidate) {
          console.log("New ICE candidate", event.candidate);
          await addDoc(offerCandidates, event.candidate.toJSON());
        }
      };

      // Create offer
      const offerDescription = await pc.createOffer();
      console.log("Created offer", offerDescription);
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });

      // Listen for remote answer
      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          console.log("Received answer", data.answer);
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      // Listen for remote ICE candidates
      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added" && pc.remoteDescription) {
            const candidate = new RTCIceCandidate(change.doc.data());
            console.log("Adding ICE candidate", candidate);
            pc?.addIceCandidate(candidate);
          }
        });
      });
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  }

  async function answerCall() {
    try {
      if (!peerConnection.current || !localStream.stream) {
        console.error("No peer connection or local stream");
        return;
      }

      const pc = peerConnection.current;

      const callDoc = doc(db, "calls", params.id);
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      // Get candidates for answerer
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          addDoc(answerCandidates, event.candidate.toJSON());
        }
      };

      // Get the call data
      const callData = (await getDoc(callDoc)).data();

      if (!callData?.offer) {
        console.error("No offer found in the room");
        return;
      }

      // Set remote description from the offer
      await pc.setRemoteDescription(new RTCSessionDescription(callData.offer));

      // Create answer
      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      // Update the doc with the answer
      await setDoc(callDoc, { answer }, { merge: true });

      // Listen for remote ICE candidates
      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added" && pc.remoteDescription) {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    } catch (error) {
      console.error("Error answering call:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header with controls */}
      <div className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-300">Room ID: {params.id}</div>
          <div className="flex gap-2">
            <Button
              onClick={toggleWebcam}
              disabled={isLoading}
              variant={localStream.isEnabled ? "destructive" : "default"}
              size="sm"
            >
              {isLoading ? "Loading..." : localStream.isEnabled ? "Stop Webcam" : "Start Webcam"}
            </Button>

            {localStream.isEnabled && (
              <>
                <Button onClick={createOffer} variant="outline" size="sm">
                  Create Call
                </Button>
                <Button onClick={answerCall} variant="outline" size="sm">
                  Join Call
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main video area */}
      <div className="flex-1 mt-16 relative w-full">
        {remoteStream.isEnabled ? (
          // Remote video as main display when connected
          <div className="w-full h-[calc(100vh-4rem)]">
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
            <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
              Remote
            </div>
          </div>
        ) : (
          // Status message when waiting for remote
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-lg">Waiting for remote peer to join...</div>
          </div>
        )}

        {/* Local video - positioned differently based on remote stream presence */}
        {localStream.isEnabled && (
          <div
            className={`${remoteStream.isEnabled ? "absolute bottom-4 right-4 w-72 h-48" : "w-full h-[calc(100vh-4rem)]"}`}
          >
            <video
              ref={localVideoRef}
              className={`rounded-lg ${remoteStream.isEnabled ? "w-full h-full object-cover shadow-lg" : "w-full h-full object-cover"}`}
              autoPlay
              playsInline
              muted
            />
            <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
              You
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
