import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("https://mmoserver.webpubsub.azure.com", {
  path: "/clients/socketio/hubs/Hub",
});

const App = () => {
  const [balls, setBalls] = useState({});

  useEffect(() => {
    const name = prompt("Enter your name:");
    socket.emit('updateName', name);

    const handleMouseClick = (event) => {
      socket.emit('moveBall', { x: event.clientX, y: event.clientY });
    };

    window.addEventListener('click', handleMouseClick);
    socket.on('ballsUpdate', (updatedBalls) => setBalls(updatedBalls));

    return () => window.removeEventListener('click', handleMouseClick);
  }, []);

  return (
    <div>
      <h1>Click anywhere to move your ball</h1>
      {Object.entries(balls).map(([id, data]) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            left: data.x,
            top: data.y,
            width: '30px',
            height: '30px',
            backgroundColor: data.color,
            borderRadius: '50%',
            transition: 'left 0.5s, top 0.5s',
            textAlign: 'center',
            color: 'black'
          }}
        >
          <div>{data.name}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
