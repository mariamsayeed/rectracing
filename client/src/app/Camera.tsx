import React, { useState, useEffect, useRef } from 'react';

const Camera = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        setIsCameraOn(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const stopCamera = async () => {
    if (isCameraOn) {
      try {
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
    isCameraOn ? stopCamera() : startCamera();
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
