// App.tsx
import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

const Collab: React.FC = () => {
  const [username, setUsername] = useState('');
  const [sessionId, setSessionId] = useState('');

  const handleCreateSession = () => {
    const sessionData = { /* Add any additional session data if needed */ };
    socket.emit('createSession', sessionData);
    socket.on('sessionCreated', ({ sessionId }) => {
      setSessionId(sessionId);
    });
   // console.log('Session created!');
  };

  const handleJoinSession = () => {
    // Assume you get sessionId from user input or some other source
    // For simplicity, let's assume the user input sessionId manually
    if (sessionId.trim() !== '') {
      socket.emit('joinSession', { sessionId, username });
      socket.on('userJoined', ({ users }) => {
        console.log('Users in the session:', users);
      });
    }
  };

  return (
    <div>
      <h1>Collaboration App</h1>
      <div>
        <button onClick={handleCreateSession}>Create Session</button>
      </div>
      {sessionId && (
        <div>
          <p>Session ID: {sessionId}</p>
          <label>
            Enter your name:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <button onClick={handleJoinSession}>Join Session</button>
        </div>
      )}
    </div>
  );
};

export default Collab;
