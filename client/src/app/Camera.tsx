import React, { useState, useEffect, useRef } from 'react';

const Camera = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.start();

        const recordedChunks: any[] = [];
        mediaRecorderRef.current.ondataavailable = function (e) {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };

        mediaRecorderRef.current.onstop = function () {
          const blob = new Blob(recordedChunks, {
            type: 'video/webm'
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = 'test.webm';
          a.click();
          window.URL.revokeObjectURL(url);
        };

        setIsCameraOn(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const stopCamera = async () => {
    if (isCameraOn) {
      try {
        await mediaRecorderRef.current?.stop();
        await Promise.all(
          streamRef.current?.getTracks().map((track) => track.stop()) || []
        );
        setIsCameraOn(false);
      } catch (err) {
        console.error("Error stopping camera:", err);
      }
    }
  };
  

  const handleCameraToggle = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    if (isCameraOn && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOn]);

  return (
    <div>
      <button onClick={handleCameraToggle}>
        {isCameraOn ? 'Turn camera off' : 'Turn camera on'}
      </button>
      {isCameraOn && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            borderRadius: '50%',
            overflow: 'hidden',
            width: '128px',
            height: '128px'
          }}
        >
          <video ref={videoRef} autoPlay />
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Camera;
