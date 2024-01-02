// RecButton.jsx

import React, { useState, useRef } from 'react';

const RecButton: React.FC = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = async (): Promise<void> => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.onstop = handleStop;

            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            setRecordedChunks([]);
            mediaRecorder.start();
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = (): void => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const handleDataAvailable = (event: BlobEvent): void => {
        if (event.data.size > 0) {
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
    };

    const handleStop = (): void => {
        if (recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            setRecordedChunks([]);

            const url = URL.createObjectURL(blob);
            downloadRecording(url);
        }
    };

    const downloadRecording = async (url: string): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 100));

        const a = document.createElement('a');
        a.href = url;
        a.download = 'screen-recording.webm';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className=''>
            <div>

            {isRecording ? (
                <button onClick={stopRecording}>Stop Recording</button>
                ) : (
                    <button onClick={startRecording}>Start Recording</button>
                    )}
            </div>

            {recordedChunks.length > 0 && (
                <div >
                    <button
                        onClick={() =>
                            downloadRecording(
                                URL.createObjectURL(new Blob(recordedChunks, { type: 'video/webm' }))
                            )
                        }
                    >
                        Download
                    </button>
                    <video controls src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/webm' }))} />
                </div>
            )}
        </div>
    );
};

export default RecButton;
