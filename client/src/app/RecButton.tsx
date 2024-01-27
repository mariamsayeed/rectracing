// RecButton.jsx
"use client";
import React, { useState, useRef ,useEffect} from "react";
import Camera from "./Camera";
import { FaCirclePlay, FaDownload } from "react-icons/fa6";
import { FaRegStopCircle } from "react-icons/fa";

const RecButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const documentRef = useRef<HTMLAnchorElement | null>(null);

  const startRecording = async (): Promise<void> => {
    try {
      let videoStream = await navigator.mediaDevices.getDisplayMedia({video: true,});
      let audioStream = await navigator.mediaDevices.getUserMedia({audio: true,});

      const combinedStream = new MediaStream();

      videoStream.getTracks().forEach((track) => combinedStream.addTrack(track));
      audioStream.getTracks().forEach((track) => combinedStream.addTrack(track));

      const mediaRecorder = new MediaRecorder(combinedStream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      setIsRecording(true);
      setRecordedChunks([]);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = (): void => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    handleStop();
  };

  const handleDataAvailable = (event: BlobEvent): void => {
    if (event.data.size > 0) {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
    }
  };

  const handleStop = (): void => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      setRecordedChunks([]);

      const url = URL.createObjectURL(blob);
      downloadRecording(url);
    }
  };

  const downloadRecording = async (url: string):Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    //const a = document.createElement("a");
    if(documentRef.current){
      documentRef.current.href = url;
      const date = new Date();
      documentRef.current.download = `recording-${date.toISOString()}.webm`;
      documentRef.current.click();
      window.URL.revokeObjectURL(url);
    }

  }; 

  return (
    <>
      <div className="absolute recordContainer">
        <div>
          {isRecording ? (
            <button onClick={stopRecording}>
              <FaRegStopCircle />
            </button>
          ) : (
            <button onClick={startRecording}>
              <FaCirclePlay />
            </button>
          )}
        </div>
        <Camera />
        {recordedChunks.length > 0 && (
          <div>
            <a ref={documentRef}></a>
            <button
              className=""
              onClick={() =>
                downloadRecording(
                  URL.createObjectURL(
                    new Blob(recordedChunks, { type: "video/webm" })
                  )
                )
              }
            >
              <FaDownload />
            </button>
          </div>
        )}
      </div>
      {recordedChunks.length > 0 && (
        <div className="absolute bottom-20 left-5">
          <video
            controls
            src={URL.createObjectURL(
              new Blob(recordedChunks, { type: "video/webm" })
            )}
            className="w-[300px] h-[200px] aspect-video border-2 border-[#b8b8b8] rounded-lg"
          />
        </div>
      )}
    </>
  );
};

export default RecButton;
