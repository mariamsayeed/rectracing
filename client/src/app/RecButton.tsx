// RecButton.jsx

import React, { useState, useRef } from "react";

const RecButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });

      const mediaRecorder = new MediaRecorder(stream);
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

  const downloadRecording = async (url: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const a = document.createElement("a");
    a.href = url;
    a.download = "screen-recording.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute">
      <div>
        {isRecording ? (
          <button
            className="mt-4 ml-4 bg-text3 hover:bg-text2 text-white font-semibold py-1 px-2 border-b-2 border-solid hover:border-solid border-text4 rounded-md"
            onClick={stopRecording}
          >
            Stop Recording
          </button>
        ) : (
          <button
            className="mt-4 ml-4 bg-text3 hover:bg-text2 text-white font-semibold py-1 px-2 border-b-2 border-solid hover:border-solid border-text4 rounded-md"
            onClick={startRecording}
          >
            Start Recording
          </button>
        )}
      </div>

      {recordedChunks.length > 0 && (
        <div>
          <button
            className="mt-4 ml-4 bg-text3 hover:bg-text2 text-white font-semibold py-1 px-2 border-b-4 border-solid hover:border-solid rounded"
            onClick={() =>
              downloadRecording(
                URL.createObjectURL(
                  new Blob(recordedChunks, { type: "video/webm" })
                )
              )
            }
          >
            <svg
              className="fill-current w-4 h-4 mr-2 inline-block align-middle"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            Download
          </button>
          <video
            controls
            src={URL.createObjectURL(
              new Blob(recordedChunks, { type: "video/webm" })
            )}
            className="w-64 h-48 mt-4 ml-4"
          />
        </div>
      )}
    </div>
  );
};

export default RecButton;
