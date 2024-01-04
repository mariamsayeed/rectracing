// Camera.tsx
import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 128,
  height: 128,
  facingMode: "user"
};

const Camera = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn);
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