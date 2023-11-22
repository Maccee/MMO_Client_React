import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./App.css";
import PlayerImg from "./assets/player.svg"

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
    <div className='bg'>

      {Object.entries(balls).map(([id, data]) => (
        <div className='player'
          key={id}
          style={{
            position: 'absolute',
            left: data.x,
            top: data.y,
            transition: 'left 0.5s, top 0.5s',
            textAlign: 'center',
            color: 'black'
          }}
        ><div>{data.name}</div><img src={PlayerImg} />
          
        </div>
      ))}
    </div>
  );
};

export default App;
