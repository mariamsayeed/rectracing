// Camera.tsx
import React, { useState, useEffect, useRef } from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 128,
  height: 128,
  facingMode: "user"
};

const Camera = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleCameraToggle = () => {
    if (isCameraOn) {
      mediaRecorderRef.current?.stop();
    } else {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(screenStream => {
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(audioStream => {
              const tracks = [...screenStream.getTracks(), ...audioStream.getAudioTracks()];
              const stream = new MediaStream(tracks);
              mediaRecorderRef.current = new MediaRecorder(stream);
              mediaRecorderRef.current.start();
              const recordedChunks: any[] = [];
              mediaRecorderRef.current.ondataavailable = function(e) {
                if (e.data.size > 0) {
                  recordedChunks.push(e.data);
                }
              };
              mediaRecorderRef.current.onstop = function() {
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
            })
            .catch(err => setError(err.message));
        })
        .catch(err => setError(err.message));
      setIsCameraOn(!isCameraOn);
    }
  };

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(err => setError(err.message));
    }
  }, [isCameraOn]);

  return (
    <div>
      <button onClick={handleCameraToggle}>
        {isCameraOn ? 'Turn camera off' : 'Turn camera on'}
      </button>
      {isCameraOn && 
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          overflow: 'hidden',
          width: '128px',
          height: '128px'
        }}>
          <Webcam videoConstraints={videoConstraints} />
        </div>
      }
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Camera;