import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { handleMovement, keyState } from "./utils/MovementUtils";
import BackGround from "./components/BackGround";
import Ui from "./components/Ui";
import "./App.css";

const socket = io("http://localhost:4000");

const App = () => {
  const [players, setPlayers] = useState({});
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 });
  const movementLoopRef = useRef();

  useEffect(() => {
    socket.on("playersUpdate", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });
    socket.on("gameArea", (area) => {
      setGameArea(area);
    });

    const keyDownHandler = (event) => {
      const key = event.key.toLowerCase();
      if (!keyState[key]) {
        keyState[key] = true;
        socket.emit("playerInput", keyState);
      }
    };

    const keyUpHandler = (event) => {
      const key = event.key.toLowerCase();
      if (keyState[key]) {
        keyState[key] = false;
        socket.emit("playerInput", keyState);
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [socket]);

  useEffect(() => {
    // Movement Loop
    const updateMovement = () => {
      if (Object.keys(keyState).some(key => keyState[key])) {
        socket.emit("playerInput", keyState); // Emit key state if any key is pressed
      }
      movementLoopRef.current = requestAnimationFrame(updateMovement);
    };
    movementLoopRef.current = requestAnimationFrame(updateMovement);

    return () => {
      cancelAnimationFrame(movementLoopRef.current);
    };
  }, []);

  useEffect(() => {
    const updateScrollPosition = () => {
      if (Object.keys(players).includes(socket.id)) {
        const currentPlayer = players[socket.id];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = currentPlayer.x - centerX;
        const deltaY = currentPlayer.y - centerY;
        window.scrollTo(deltaX, deltaY);
      }
    };
    updateScrollPosition();
  }, [players]);

  return (
    <>
      <Ui currentPlayer={players[socket.id] || {}} />
      <BackGround players={players} gameArea={gameArea} />
    </>
  );
};

export default App;
